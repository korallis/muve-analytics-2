export type ClientTimelineEvent = {
  id: string;
  at: string;
  type: "Visit" | "Medication" | "Incident" | "Safeguarding" | "Observation" | "Authorisation";
  title: string;
  detail: string;
  status: "Complete" | "Open" | "Review";
};

export const demoClients = {
  "RH-014": {
    id: "RH-014",
    name: "Person RH-014",
    service: "Rose House",
    assurance: "Adequate",
    timeline: [
      { id: "MED-902", at: "21 Jul · 08:12", type: "Medication", title: "Medication omission recorded", detail: "Structured outcome: omitted; clinical review action raised.", status: "Open" },
      { id: "VIS-811", at: "21 Jul · 07:30", type: "Visit", title: "Morning support completed", detail: "Arrived within approved punctuality window.", status: "Complete" },
      { id: "OBS-321", at: "20 Jul · 19:10", type: "Observation", title: "Positive outcome observation", detail: "Participation in evening meal planning recorded.", status: "Complete" },
      { id: "INC-2481", at: "20 Jul · 15:42", type: "Safeguarding", title: "Safeguarding follow-up", detail: "Canonical incident is open; referral outcome requires evidence.", status: "Review" },
    ] satisfies ClientTimelineEvent[],
  },
  "OV-003": {
    id: "OV-003",
    name: "Person OV-003",
    service: "Oak View",
    assurance: "Strong",
    timeline: [
      { id: "AUTH-72", at: "20 Jul · 12:00", type: "Authorisation", title: "Community authorisation review", detail: "Setting-aware Court of Protection route; review due in 30 days.", status: "Review" },
      { id: "VIS-790", at: "20 Jul · 08:05", type: "Visit", title: "Morning support completed", detail: "All planned care tasks documented.", status: "Complete" },
    ] satisfies ClientTimelineEvent[],
  },
  "NSL-008": {
    id: "NSL-008",
    name: "Person NSL-008",
    service: "North Supported Living",
    assurance: "Weak",
    timeline: [
      { id: "INC-2490", at: "21 Jul · 00:20", type: "Incident", title: "Late night visit reviewed", detail: "Repeated staffing pattern grouped with a related exception.", status: "Open" },
      { id: "OBS-302", at: "19 Jul · 14:15", type: "Observation", title: "Outcome evidence awaiting review", detail: "Observation is nine days from governance review deadline.", status: "Review" },
    ] satisfies ClientTimelineEvent[],
  },
} as const;

export type DemoClientId = keyof typeof demoClients;

export function getClient(id: string) {
  return id in demoClients ? demoClients[id as DemoClientId] : null;
}
