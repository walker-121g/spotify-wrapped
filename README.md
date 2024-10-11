# CS 2340 Project #2 - Spotify Wrapped
Django REST Backend + Vite React Frontend

### Dependencies
- [Python](https://www.python.org/downloads/) 
- [NodeJS](https://nodejs.org/en/download/package-manager)
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL](https://www.postgresql.org/download/)
- make (see below)


### Setup
1. Clone the repository
```
git clone github.com/syauger/atl-food-finder.git
```
2. Setup a virtual environment
```
python -m venv .venv
```
 - Windows:
	```
	.\.venv\Scripts\activate
	```
 - MacOS:
	```
	source ./.venv/bin/activate
	```
3. Run frontend and backend
```
make dev
```

### Installing make
- Windows:
	1. Install [chocolatey](https://chocolatey.org/install)
	2. Install [make](https://community.chocolatey.org/packages/make) from chocolatey
		```
		choco install make
		```
- MacOS:
	1. Install make from Homebrew
		```
		brew install make
		```