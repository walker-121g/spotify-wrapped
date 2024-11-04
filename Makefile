.SHELLFLAGS += -e

check-root:
	@test -d backend -a -d frontend || (echo "Error: Makefile must be run from the root of the project")

build-frontend: check-root
	(cd frontend && pnpm install && pnpm run build)
	rm -rf backend/wrapped/templates/wrapped/index.html
	mv backend/wrapped/static/wrapped/app/index.html backend/wrapped/templates/wrapped/

lint-frontend: check-root
	(cd frontend && pnpm install && pnpm run lint)

lint-backend: check-root
	(flake8 --max-line-length 120 --exclude=migrations backend/)

test-frontend: check-root
	(cd frontend && pnpm install && pnpm run test)

test-backend: check-root
	(pytest backend/)

dev-frontend: check-root
	(cd frontend && pnpm install && pnpm run dev)

dev-backend: check-root
	(cd backend && python manage.py runserver)

dev:
	make -j 2 dev-frontend dev-backend

lint:
	make -j 2 lint-frontend lint-backend

test:
	make -j 2 test-frontend test-backend
