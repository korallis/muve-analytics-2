from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, Mapping


@dataclass(frozen=True)
class ValidationResult:
    check: str
    passed: bool
    detail: str


def validate_rows(rows: Iterable[Mapping[str, object]], primary_key: str, required: tuple[str, ...]) -> tuple[ValidationResult, ...]:
    materialised = tuple(rows)
    keys = [row.get(primary_key) for row in materialised]
    results = [
        ValidationResult("row_count", bool(materialised), f"{len(materialised)} staged rows"),
        ValidationResult("key_not_null", all(key is not None for key in keys), primary_key),
        ValidationResult("key_unique", len(keys) == len(set(keys)), primary_key),
        ValidationResult("required_columns", all(all(field in row for field in required) for row in materialised), ", ".join(required)),
    ]
    return tuple(results)


def classify_schema_change(expected: set[str], actual: set[str]) -> str:
    missing = expected - actual
    if missing:
        return "breaking-quarantine"
    if actual - expected:
        return "additive-warning"
    return "compatible"


def assert_promotable(results: tuple[ValidationResult, ...]) -> None:
    failures = [result for result in results if not result.passed]
    if failures:
        details = "; ".join(f"{result.check}: {result.detail}" for result in failures)
        raise RuntimeError(f"Run quarantined; last-good dataset retained: {details}")
