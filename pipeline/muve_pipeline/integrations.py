from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from urllib.request import Request, urlopen
import json


@dataclass(frozen=True)
class Snapshot:
    source: str
    watermark: str
    records: tuple[dict[str, object], ...]


def fetch_json_snapshot(source: str, url: str, token: str) -> Snapshot:
    request = Request(url, headers={"Authorization": f"Bearer {token}", "Accept": "application/json"})
    with urlopen(request, timeout=30) as response:
        payload = json.loads(response.read())
    if not isinstance(payload, list):
        raise RuntimeError(f"{source} response was not a record list")
    records = tuple(record for record in payload if isinstance(record, dict))
    watermark = datetime.now(timezone.utc).isoformat()
    return Snapshot(source=source, watermark=watermark, records=records)


def xero_snapshot(url: str, token: str) -> Snapshot:
    return fetch_json_snapshot("xero", url, token)


def spendesk_snapshot(url: str, token: str) -> Snapshot:
    return fetch_json_snapshot("spendesk", url, token)
