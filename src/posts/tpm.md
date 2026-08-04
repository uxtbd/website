---
layout: blogs.njk
title: "TPM"
description: "101 basic, simple guide on how to get LUKS and TPM together!"
tags: ["posts", "tpm", "security"]
draft: true
---

This week I've been digging into TPM, respectively it's 2.0 version and I've come across it's importance and usability when it comes to encrypting your hard-drives.

## What is TPM?

_Taken from Wikipedia!_

A Trusted Platform Module (TPM) is a secure cryptoprocessor that implements the ISO/IEC 11889 standard. Common uses are verifying that the boot process starts from a trusted combination of hardware and software and storing disk encryption keys.

<a title="© Raimond Spekking" href="https://commons.wikimedia.org/wiki/File:Lenovo_N20_Chrome_-_motherboard_-_Infineon_SLB9655TT12-49890.jpg"><img width="330" alt="Trusted Platform Module TPM 1.2  Infineon SLB9655TT12 on the motherboard ot the notebook Lenovo N20 Chrome" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Lenovo_N20_Chrome_-_motherboard_-_Infineon_SLB9655TT12-49890.jpg/330px-Lenovo_N20_Chrome_-_motherboard_-_Infineon_SLB9655TT12-49890.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"></a>

## So... what can you do with it?

1. SSH Key generation and sealing in TPM, allows you to keep the secret SSH keys in your TPM instead of your ugly /home/$USER/.ssh folder.
2. LUKS encryption, aka, full disk encryption! (or partition, you choose).
3. Use as Hardware-based Trusted Random Number Generator, it's a good source of entropy most of the time, however not all firmware supports it to be used as that.
4. You can seal files you want to keep "confidential" with a key of them in your TPM.
5. Achieve secure+measured boot if using systemd (you can achieve it with others but systemd makes it the easiest).

## Secure boot guide

You can use `sbctl` if you'd like a more automated, safe way. I personally went the entire manual way as a way to learn.

### Prerequirements

1. Have TPM 2.0, you can check with this command `systemd-analyze has-tpm2`
2. OpenSSL or any other cryptographic userspace tool.
3. Willingness to handle any non-mentioned problem in here, my case was rather smooth, mileage might or will heavily vary.

### Generate the key

**All commands should be run as root.** I used OpenSSL for this, most distros package it anyways.

Generate the needed 4096-bit RSA keys:

`openssl req -newkey rsa:4096 -nodes -keyout /etc/kernel/secure-boot-private-key.pem -new -x509 -sha256 -days 3650 -out /etc/kernel/secure-boot-certificate.pem -subj "/CN=Custom Secure Boot Authority/`

I suggest protecting the files:

`chmod 600 /etc/kernel/secure-boot-private-key.pem` `chmod 640 /etc/kernel/secure-boot-certificate.pem`

Then you can copy the stock UKI.conf file from /usr/lib/kernel/uki.conf (or here):

```bash
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it under the
#  terms of the GNU Lesser General Public License as published by the Free
#  Software Foundation; either version 2.1 of the License, or (at your option)
#  any later version.
#
# Ini-style configuration file for ukify(1) which is only effective when
# $KERNEL_INSTALL_LAYOUT or layout= in install.conf is set to uki and
# $KERNEL_INSTALL_UKI_GENERATOR or uki_generator= in install.conf is set to
# ukify, or is unset. $KERNEL_INSTALL_CONF_ROOT may be used to override the
# search path.
#
# See kernel-install(8) for details.

#[UKI]
#Initrd=
#Microcode=
#Splash=
#PCRPKey=
#PCRBanks=
#SecureBootSigningTool=
#SecureBootPrivateKey=/etc/kernel/secure-boot-private-key.pem
#SecureBootCertificate=/etc/kernel/secure-boot-certificate.pem
#SecureBootCertificateDir=
#SecureBootCertificateName=
#SecureBootCertificateValidity=
#SigningEngine=
#SignKernel=

#[PCRSignature:NAME]
#PCRPrivateKey=/etc/systemd/tpm2-pcr-private-key.pem
#PCRPublicKey=/etc/systemd/tpm2-pcr-public-key.pem
#Phases=
```

You can generate the PCR keys with:

`ukify genkey --pcr-private-key=/etc/systemd/tpm2-pcr-private-key-initrd.pem --pcr-public-key=/etc/systemd/tpm2-pcr-public-key-initrd.pem`
