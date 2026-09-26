# Sovereign AI Stack (SAS) — Enterprise Security Ecosystem

[![NomaanOS-Core CI](https://github.com/NomaanOS-Dev/NomaanOS-Core/actions/workflows/quality.yml/badge.svg)](https://github.com/NomaanOS-Dev/NomaanOS-Core/actions)
[![ShieldSOC CI](https://github.com/NomaanOS-Dev/NomaanOS-ShieldSOC/actions/workflows/ci.yml/badge.svg)](https://github.com/NomaanOS-Dev/NomaanOS-ShieldSOC/actions)
[![GhostNode CI](https://github.com/NomaanOS-Dev/NomaanOS-GhostNode/actions/workflows/ci.yml/badge.svg)](https://github.com/NomaanOS-Dev/NomaanOS-GhostNode/actions)
[![EvidenceLedger CI](https://github.com/NomaanOS-Dev/NomaanOS-EvidenceLedger/actions/workflows/ci.yml/badge.svg)](https://github.com/NomaanOS-Dev/NomaanOS-EvidenceLedger/actions)

NomaanOS is a modular, defense-in-depth security framework built for sovereign AI execution, edge telemetry observation, air-gapped node attestation, and cryptographic evidence chains.

---

## 🏛️ Ecosystem Architecture

```text
[ NomaanOS-Core ] (Central Orchestrator & CLI Kernel)
       │
       ├──► [ NomaanOS-ShieldSOC ] (Edge Telemetry & Observability)
       │
       ├──► [ NomaanOS-GhostNode ] (Air-Gapped Keyed HMAC Attestation)
       │
       └──► [ NomaanOS-EvidenceLedger ] (Append-Only SHA-256 Hash Chain)
📦 Core Repositories
RepositoryPrimary FunctionState & Integrity Model
NomaanOS-CoreKernel execution CLI & orchestratorFail-closed process model
NomaanOS-ShieldSOCObservability & Host Telemetry AdapterHonest unverified defaults with DI
NomaanOS-GhostNodeNode identity & challenge-response engineKeyed HMAC proofs (32-byte secret)
NomaanOS-EvidenceLedgerCryptographic Audit LedgerHash-linked chain with verify_chain()

🛡️ Governance & Security Policies
​All repositories adhere to strict security reporting policies:
​Coordinated vulnerability disclosure via private contact.
​No false claims of hardware compliance; explicit software-boundary threat modeling.
​Continuous multi-version Python testing via GitHub Actions.
​Author: Nomaan Khan (IHFC - IIT Delhi Scholar)
