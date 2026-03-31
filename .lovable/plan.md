

# Add Uploaded Destination Images

Copy 10 uploaded images to `src/assets/` and wire them into the Destinations page and Homepage, replacing placeholder references.

## Image Mapping

| Uploaded File | Asset Name | Used For |
|---|---|---|
| `Aberdare_National_Park.jfif` | `aberdare.jfif` | Destinations: Aberdare National Park |
| `Akagera_National_Park.jfif` | `akagera.jfif` | Destinations: Akagera National Park |
| `Lake_Kivu.jpg` | `lake-kivu.jpg` | Destinations: Lake Kivu |
| `Nyungwe_Forest.jfif` | `nyungwe.jfif` | Destinations: Nyungwe Forest |
| `Kigali_City.jpg` | `kigali.jpg` | Destinations: Kigali + Homepage: Kigali card |
| `Murchison_falls.jpg` | `murchison-falls.jpg` | Destinations: Murchison Falls |
| `jinja_city.jpg` | `jinja.jpg` | Destinations: Jinja |
| `Mt_Rwenzori.jpeg` | `rwenzori.jpeg` | Destinations: Rwenzori Mountains |
| `Kampala.jfif` | `kampala.jfif` | Destinations: Kampala + Homepage: Kampala card |
| `Bwindi_Impenetrable_National_Park.jpg` | `bwindi.jpg` | Destinations: Bwindi Impenetrable |

## Files Modified

1. **`src/pages/Destinations.tsx`** -- Add 10 imports, replace `ph` references for the 10 matching destinations (Kenya: Aberdare; Uganda: all 5; Rwanda: all 4)
2. **`src/pages/Index.tsx`** -- Add 2 imports (Kigali, Kampala), replace placeholder strings for those homepage destination cards

