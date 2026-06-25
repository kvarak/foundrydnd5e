.PHONY: all install build build-code build-css build-db lint test clean zip watch

# Read system ID and version from system.json
SYSTEM_ID   := $(shell node -p "require('./system.json').id")
VERSION     := $(shell node -p "require('./system.json').version")
ZIP_NAME    := $(SYSTEM_ID)-$(VERSION).zip

# Files to include in the zip (mirrors the CI archive logic)
MANIFEST_FILES := $(shell node -e " \
  const m = require('./system.json'); \
  const files = ['system.json', \
    ...(m.esmodules ?? []), \
    ...(m.esmodules?.map(s => s + '.map') ?? []), \
    ...(m.styles ?? []), \
    ...(m.packs?.map(p => p.path) ?? []), \
    ...(m.languages?.map(l => l.path) ?? [])]; \
  console.log(files.join(' ')); \
")

all: build

## Install node dependencies (skipping postinstall scripts)
install:
	npm ci --ignore-scripts

## Build everything: JS bundle, CSS, and compendium packs
build: build-code build-css build-db
	@mv --force varlyn-dnd5e-compiled.mjs varlyn-dnd5e.mjs 2>/dev/null || true

## Build and bundle the JS entry point
build-code:
	npm run build:code

## Compile LESS to CSS
build-css:
	npm run build:css

## Pack compendium sources into .db files
build-db:
	npm run build:db

## Unpack compiled .db files back to YAML source
unpack:
	npm run build:json

## Run ESLint on all .mjs files
lint:
	npm run lint

## Run all checks: lint, system.json validation, and full build
test: lint _validate-system-json build
	@echo "All checks passed."

_validate-system-json:
	@echo "Validating system.json..."
	@node -e " \
	  const s = require('./system.json'); \
	  const required = ['id', 'title', 'version', 'compatibility', 'esmodules', 'styles', 'languages', 'packs']; \
	  const missing = required.filter(k => !(k in s)); \
	  if (missing.length) { console.error('system.json missing fields:', missing.join(', ')); process.exit(1); } \
	  if (!s.version || !/^\d+\.\d+\.\d+/.test(s.version)) { console.error('system.json: invalid version format:', s.version); process.exit(1); } \
	  console.log('system.json OK — id:', s.id, '| version:', s.version); \
	"

## Package the system into a zip for distribution
zip: build
	@echo "Creating $(ZIP_NAME)..."
	zip $(ZIP_NAME) -r $(MANIFEST_FILES)
	@echo "Created $(ZIP_NAME)"

## Remove build artifacts
clean:
	rm -f varlyn-dnd5e-compiled.mjs varlyn-dnd5e-compiled.mjs.map varlyn-dnd5e.css varlyn-dnd5e.css.map
	rm -f $(SYSTEM_ID)-*.zip
	npm run build:clean 2>/dev/null || true

## Watch LESS files and recompile CSS on change
watch:
	npm run watch

## Show available targets
help:
	@echo "Targets:"
	@echo "  install     Install npm dependencies"
	@echo "  build       Build JS, CSS, and packs (default)"
	@echo "  build-code  Bundle JS entry point only"
	@echo "  build-css   Compile LESS to CSS only"
	@echo "  build-db    Pack compendium sources only"
	@echo "  unpack      Unpack .db files to YAML source"
	@echo "  lint        Run ESLint"
	@echo "  test        Lint, validate system.json, and full build"
	@echo "  zip         Build and create distribution zip"
	@echo "  clean       Remove build artifacts"
	@echo "  watch       Watch and recompile LESS on change"
