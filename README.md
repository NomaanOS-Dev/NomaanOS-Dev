<div align="center">

# NomaanOS — Sovereign AI Stack (SAS)

### Enterprise-Hardened, Zero-Dependency Edge Security Kernel & P2P Fabric

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20RaspberryPi%20%7C%20POSIX-orange?style=for-the-badge&logo=linux&logoColor=white)
![Security](https://img.shields.io/badge/Security-Keyed%20HMAC%20SHA--256-red?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Zero--Dependency-Stdlib%20Only-brightgreen?style=for-the-badge)

<br>

**Architect & Principal Investigator:**  
[Nomaan Khan](https://github.com/NomaanKhan)  
Scholar @ IHFC — IIT Delhi

</div>

---

## Ecosystem Architecture Overview

```mermaid
flowchart TD
    subgraph Host["Host Hardware Layer"]
        KERNEL["Linux Kernel<br/>sysfs / Thermal Zones"]
    end

    subgraph Enclave["NomaanOS Security Enclave"]
        CORE["NomaanOS-Core<br/>Orchestrator v1.1.0"]
        SOC["NomaanOS-ShieldSOC<br/>Telemetry Engine v1.1.0"]
        LEDGER["NomaanOS-EvidenceLedger<br/>SHA-256 v1.1.0"]
        GHOST["NomaanOS-GhostNode<br/>HMAC Attestation v1.0.0"]
    end

    subgraph Swarm["Distributed Swarm Mesh"]
        MESH["NomaanOS-MeshLink<br/>P2P Gossip Daemon v1.0.0"]
        PEER["Edge Peer Swarm Sockets"]
    end

    KERNEL --> SOC
    SOC --> CORE
    GHOST --> CORE
    CORE --> LEDGER
    CORE --> MESH
    MESH <--> PEER
```

## Verified Production Repositories

| Repository | Version | Status | Primary Capability |
|---|---:|---|---|
| [NomaanOS-Core](https://github.com/NomaanOS-Dev/NomaanOS-Core) | v1.1.0 | Production | Master orchestrator, CLI, TUI console, and REST daemon |
| NomaanOS-ShieldSOC | v1.1.0 | Production | Direct Linux hardware telemetry and observability engine |
| NomaanOS-EvidenceLedger | v1.1.0 | Production | Disk-persistent cryptographic hash chain |
| NomaanOS-GhostNode | v1.0.0 | Production | Keyed cryptographic enclave attestation |
| NomaanOS-MeshLink | v1.0.0 | Production | Autonomous UDP swarm discovery and dynamic topology |

## Global Verification

POSIX/Linux environment पर stack verify करने के लिए:

```bash
git clone https://github.com/NomaanOS-Dev/NomaanOS-Core.git
cd NomaanOS-Core

python3 --version
python3 nomaanos.py --status
python3 nomaanos.py chain-verify
```

अगर `python3` उपलब्ध नहीं है, तो यह command इस्तेमाल करें:

```bash
python nomaanos.py --status
python nomaanos.py chain-verify
```

## Requirements

- Python 3.8 or newer
- Linux or another POSIX-compatible environment
- No external Python dependencies required

## Troubleshooting

अगर command fail हो, तो पहले available commands देखें:

```bash
python3 nomaanos.py --help
```

Python file का syntax check करें:

```bash
python3 -m py_compile nomaanos.py
```

और repository की files verify करें:

```bash
ls -la
find . -maxdepth 2 -type f
```

## License

See the repository license for usage and distribution terms.
