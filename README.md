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
RepositoryVersionStatusPrimary Capability
NomaanOS-Corev1.1.0Zero-Cloud Local AI Execution Kernel
NomaanOS-EvidenceLedgerv1.1.0Cryptographic, Append-Only Tamper-Proof Audit Store
NomaanOS-ShieldSOCv1.1.0Real-Time Hardware Telemetry & Threat Anomaly Detection
NomaanOS-GhostNodev1.0.0Air-Gapped Distributed Peer-to-Peer Swarm Daemon
Global Stack Verification
To independently verify the entire architecture on any standard POSIX/Linux environment:

Clone and verify core orchestrator
git clone https://github.com/NomaanOS-Dev/NomaanOS-Core.git
cd NomaanOS-Core

Environment & runtime verification
python3 --version
python3 nomaanos.py --status
python3 nomaanos.py chain-verify

If default alias mapping is unlinked, execute directly via standard binary:
python nomaanos.py --status
python nomaanos.py chain-verify

System Requirements
Runtime: Python 3.8+ (Zero third-party package dependencies required)
Operating System: Linux, Android (Termux), or standard POSIX-compliant environment
Cryptographic Primitives: Standard Python hashlib & hmac (SHA-256)
Diagnostics & Troubleshooting
Inspect available command line flags:
python3 nomaanos.py --help

Verify abstract syntax tree and compilation sanity:
python3 -m py_compile nomaanos.py

Audit file tree and permission boundaries:
ls -la
find . -maxdepth 2 -type f

License & Intellectual Property
Licensed under the MIT License. Developed and maintained by Nomaan Khan (IHFC — IIT Delhi).
