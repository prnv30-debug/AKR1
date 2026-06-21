"""Rotating file + console logging for the AKR Trust API."""
import logging
import sys
from logging.handlers import RotatingFileHandler
from pathlib import Path

LOG_DIR = Path(__file__).resolve().parent.parent / "logs"
ACCESS_LOG = LOG_DIR / "access.log"
ERROR_LOG = LOG_DIR / "error.log"

_MAX_BYTES = 5 * 1024 * 1024  # 5 MB
_BACKUP_COUNT = 5

_FORMAT = "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def _make_handler(path: Path, level: int) -> RotatingFileHandler:
    handler = RotatingFileHandler(
        path,
        maxBytes=_MAX_BYTES,
        backupCount=_BACKUP_COUNT,
        encoding="utf-8",
    )
    handler.setLevel(level)
    handler.setFormatter(logging.Formatter(_FORMAT, datefmt=_DATE_FORMAT))
    return handler


def setup_logging() -> tuple[logging.Logger, logging.Logger]:
    """Configure access and error loggers with rotating files."""
    LOG_DIR.mkdir(parents=True, exist_ok=True)

    console = logging.StreamHandler(sys.stdout)
    console.setLevel(logging.INFO)
    console.setFormatter(logging.Formatter(_FORMAT, datefmt=_DATE_FORMAT))

    access_logger = logging.getLogger("akr.access")
    access_logger.setLevel(logging.INFO)
    access_logger.propagate = False
    if not access_logger.handlers:
        access_logger.addHandler(_make_handler(ACCESS_LOG, logging.INFO))
        access_logger.addHandler(console)

    error_logger = logging.getLogger("akr.error")
    error_logger.setLevel(logging.ERROR)
    error_logger.propagate = False
    if not error_logger.handlers:
        error_logger.addHandler(_make_handler(ERROR_LOG, logging.ERROR))
        error_logger.addHandler(console)

    app_logger = logging.getLogger("akr.api")
    app_logger.setLevel(logging.INFO)
    if not app_logger.handlers:
        app_logger.addHandler(console)

    return access_logger, error_logger
