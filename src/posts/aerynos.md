---
layout: blogs.njk
title: "AerynOS | My Experience"
description: "My experience with this rather unique Linux distribution"
tags: ["posts", "aerynos"]
---

> **Notice:** This post is regularly updated. Information documented here reflects current state and may change rapidly.

---

AerynOS takes a fundamentally different approach to the desktop Linux ecosystem. According to their [overview page](https://aerynos.dev/aerynos/overview/):

> "AerynOS is a Linux-based operating system designed to eliminate years of technical baggage. It is an engineering led effort in that the distribution is produced entirely by the tooling we have developed."

By stripping out legacy GNU assumptions in favor of an LLVM toolchain and native Rust infrastructure, it builds that vision directly into its core design.

---

## First Impressions

The installer ISO and the general system were quite stable, no crashes, no missing drivers (with the exception of NVIDIA, read below.), nothing missing in general.

The installer process itself was a bit problematic as one would expect from an Alpha distribution, regardless of that, solving the issue was rather trivial and getting a fully system running was quite easy to be fair.

---

## As a daily driver

As for the post-installation experience, it was a very comfortable experience, all software worked as expected, you can choose between KDE, GNOME or COSMIC on the installer itself, which is a quite nice thing. All packages during installation are pulled from the network so you will be up to date from the get go.

---

## What Works Well

The package manager, `moss` is quite nice, relatively well performant, I will not go into absolute details in this post but I will go into details in the next one, or whenever I feel ready to do so.

### Example of how moss is used

1. To install a package you need to use `moss it <package name>`.

2. To update the system, you'd need to use `sudo moss sync --update`, this pulls fresh repository metadata before applying upgrades. Moss records the result as a new state, so you can roll back if something goes wrong.

3. To uninstall a package, you can use `moss rm <package name>`.

---

## Packaging

This distribution has an exceptionally easy way to package things, there's no hard requirement of tracking soname versions, as it's entirely handled by `boulder`, the package build tool.

Everything is currently done through stone.yaml files, yes! You use YAML to create the packages (or how we call it in AerynOS, recipes).

_here's an example taken from [AerynOS Recipes Overview](https://aerynos.dev/packaging/recipes/overview/)_

```yaml
name: nano
version: 8.7
release: 38
homepage: https://www.nano-editor.org/
upstreams:
    - https://www.nano-editor.org/dist/v8/nano-8.7.tar.xz: afd287aa672c48b8e1a93fdb6c6588453d527510d966822b687f2835f0d986e9
summary: GNU Text Editor
description: |
    Nano is a small and simple text editor for use on the terminal.
    It copied the interface and key bindings of the Pico editor but
    added several missing features: undo/redo, syntax highlighting,
    line numbers, softwrapping, multiple buffers, selecting text by
    holding Shift, search-and-replace with regular expressions, and
    several other conveniences.
license:
    - GPL-3.0-or-later
builddeps:
    - binary(msgfmt)
    - pkgconfig(libmagic)
    - pkgconfig(ncursesw)
    - pkgconfig(zlib)
setup: |
    %configure
build: |
    %make
install: |
    %make_install
```

As you can see, it's quite easy.

---

## Limitations

1. Software availability, as it's a relatively small distribution, there isn't much in the repos themselves, for this specific reason, Flatpak is pre-installed on all systems.

2. NVIDIA Hardware isn't supported, due to the closed-source nature of NVIDIA software, it's significantly more complicated to package, fix and test for the small developer team.

3. As of 27/07/2026, x86_64 is the minimum supported architecture (uarch being x86_64-v2), this means that very old hardware or non x86_64 hardware will be unable to run this distribution

---

## Verdict

I believe this distribution will be great for those who have been looking for a distribution that uses LLVM and Rust as part of their infrastructure, tooling, etcetera.
