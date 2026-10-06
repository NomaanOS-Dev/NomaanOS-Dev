<div align="center">

# NomaanOS — Sovereign AI Stack (SAS)
### Enterprise-Hardened, Zero-Dependency Edge Security Kernel & P2P Fabric

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg?style=for-the-badge&logo=python)](https://www.python.org/)
[![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20POSIX-orange.svg?style=for-the-badge&logo=linux)](https://github.com/NomaanOS-Dev)
[![Security](https://img.shields.io/badge/Security-Keyed%20HMAC--SHA256-red.svg?style=for-the-badge&logo=lock)](https://github.com/NomaanOS-Dev)
[![Standard Library](https://img.shields.io/badge/Dependencies-Standard%20Library%20Only-brightgreen.svg?style=for-the-badge)](https://github.com/NomaanOS-Dev)

<br/>

**Architect & Principal Investigator**  
**[Nomaan Khan](https://github.com/NomaanOS-Dev)**  
*Scholar @ IHFC — IIT Delhi*

---

</div>

## Ecosystem Architecture Overview

```mermaid
flowchart TD
    subgraph Host\_Layer["Host Hardware Layer"]
        LK["Linux Kernel (sysfs / Sensors)"]
    end

    subgraph Security\_Enclave["NomaanOS Security Enclave"]
        SOC["NomaanOS-ShieldSOC<br/>Autonomous Telemetry Daemon"]
        CORE["NomaanOS-Core<br/>Offline AI Execution Kernel"]
        LEDGER["NomaanOS-EvidenceLedger<br/>Cryptographic Audit Store"]
    end

    subgraph Mesh\_Network["Distributed Edge Network"]
        GHOST["NomaanOS-GhostNode<br/>Air-Gapped P2P Swarm Engine"]
    end

    LK --> SOC
    SOC --> CORE
    CORE --> LEDGER
    CORE <--> GHOST

Verified Production Repositories
NomaanOS-Core — v1.1.0 — Zero-Cloud Local AI Execution Kernel
NomaanOS-EvidenceLedger — v1.1.0 — Cryptographic, Append-Only Tamper-Proof Audit Store
NomaanOS-ShieldSOC — v1.1.0 — Real-Time Hardware Telemetry & Threat Anomaly Detection
NomaanOS-GhostNode — v1.0.0 — Air-Gapped Distributed Peer-to-Peer Swarm Daemon

Global Stack Verification
git clone https://github.com/NomaanOS-Dev/NomaanOS-Core.git
cd NomaanOS-Core
python3 --version
python3 nomaanos.py --status
python3 nomaanos.py chain-verify

If alias mapping is unavailable, run:
python nomaanos.py --status
python nomaanos.py chain-verify

System Requirements
Python 3.8+
Linux, Android (Termux), or any POSIX-compliant environment
Standard library only: hashlib, hmac (SHA-256)

Diagnostics & Troubleshooting
python3 nomaanos.py --help
python3 -m py\_compile nomaanos.py
ls -la
find . -maxdepth 2 -type f

License & Intellectual Property
Licensed under the MIT License. Developed and maintained by Nomaan Khan (IHFC — IIT Delhi).
