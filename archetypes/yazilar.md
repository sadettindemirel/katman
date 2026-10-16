---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
description: ""            # özet, en fazla 200 karakter
author: ""                 # ad soyad (öğrenci numarası yok)
ders: ""
donemler: "2026 Güz"       # YIL Güz/Bahar/Yaz
odevler: ""                # Vize ya da Final
date: {{ .Date }}
olusturma: {{ .Date }}     # panelde otomatik; sitede gösterilmez
cover:
  image: ""                # https://... harici görsel
  alt: ""
  caption: ""              # görsel kaynağı / telif notu
tags: []                   # konu etiketleri
veri_kaynaklari: []        # isteğe bağlı: - {ad: "", baglanti: "", tarih: ""}
draft: true
# Vitrin ve yarışma bilgileri burada değil: data/vitrin.yaml, data/yarismalar.yaml
---

