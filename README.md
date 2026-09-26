<div align="center">

# NomaanOS — Sovereign AI Stack (SAS)
### Enterprise-Hardened, Zero-Dependency Edge Security Kernel & P2P Fabric

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20RaspberryPi%20%7C%20POSIX-orange?style=for-the-badge&logo=linux&logoColor=white)
![Security](https://img.shields.io/badge/Security-Keyed%20HMAC%20SHA--256-red?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Zero--Dependency-Stdlib%20Only-brightgreen?style=for-the-badge)

<br/>

**Architect & Principal Investigator:** [Nomaan Khan](https://github.com/NomaanKhan) (Scholar @ IHFC - IIT Delhi)

</div>

---

## 🏛 Ecosystem Architecture Overview

```mermaid
flowchart TD
    subgraph Host[Host Hardware Layer]
        KERNEL[Linux Kernel sysfs / Thermal Zones]
    end

    subgraph Enclave[NomaanOS Security Enclave]
        CORE[NomaanOS-Core Orchestrator v1.1.0]
        SOC[NomaanOS-ShieldSOC Telemetry Engine v1.1.0]
        LEDGER[NomaanOS-EvidenceLedger SHA-256 v1.1.0]
        GHOST[NomaanOS-GhostNode HMAC Attestation v1.0.0]
    end

    subgraph Swarm[Distributed Swarm Mesh]
        MESH[NomaanOS-MeshLink P2P Gossip Daemon v1.0.0]
        PEER[Edge Peer Swarm Sockets]
    end

    KERNEL --> SOC
    SOC --> CORE
    GHOST --> CORE
    CORE --> LEDGER
    CORE --> MESH
    MESH <--> PEER

📦 Verified Production Repositories
| Repository | Version | Status | Primary Capability |
|---|---|---|---|
| NomaanOS-Core | v1.1.0 |  | Master Orchestrator, CLI, TUI Console, & REST Daemon |
| NomaanOS-ShieldSOC | v1.1.0 |  | Direct Linux Hardware Telemetry & Observability Engine |
| NomaanOS-EvidenceLedger | v1.1.0 |  | Disk-Persistent Tamper-Proof Cryptographic Hash Chain |
| NomaanOS-GhostNode | v1.0.0 |  | Keyed Cryptographic Enclave Attestation Unit |
| NomaanOS-MeshLink | v1.0.0 |  | Autonomous UDP Swarm Discovery Engine & Dynamic Topology |
⚡ Global Verification
Poore stack ko kisi bhi POSIX / Linux environment par zero dependencies ke sath verify karein:
git clone https://github.com/NomaanOS-Dev/NomaanOS-Core.git
cd NomaanOS-Core
python3 nomaanos.py --status
python3 nomaanos.py chain-verify

