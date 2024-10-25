import importlib
import pkgutil


def import_submodules(package_name):
    """
    This is just to recursivley import all
    the views modules in this folder and its subdirectories

    This allows us to not have to manually import all views
    """
    package = importlib.import_module(package_name)

    for loader, module_name, is_pkg in pkgutil.iter_modules(package.__path__):
        full_module_name = f"{package_name}.{module_name}"
        print(full_module_name)
        module = importlib.import_module(full_module_name)

        if is_pkg:
            import_submodules(full_module_name)

        for attr in dir(module):
            if not attr.startswith("_"):
                globals()[attr] = getattr(module, attr)


import_submodules(__name__)
