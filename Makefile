.SHELLFLAGS += -e

check-root:
	@test -d backend -a -d frontend || (echo "Error: Makefile must be run from the root of the project")

build-frontend: check-root
	(cd frontend && pnpm install && pnpm run build)
	rm -rf backend/wrapped/templates/wrapped/index.html
	mv backend/wrapped/static/wrapped/app/index.html backend/wrapped/templates/wrapped/

dev-frontend: check-root
	(cd frontend && pnpm install && pnpm run dev)

lint-frontend: check-root
	(cd frontend && pnpm install && pnpm run lint)

dev-backend: check-root
	(cd backend && python manage.py runserver)

dev:
	make -j 2 dev-frontend dev-backend
