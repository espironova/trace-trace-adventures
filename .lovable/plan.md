

# Add Remaining Kenya Destination Images

Copy 10 uploaded images to `src/assets/` and update `Destinations.tsx` to replace the last placeholder destinations.

## Image Mapping

| Uploaded File | Asset Name | Destination |
|---|---|---|
| `Mombasa.webp` | `mombasa.webp` | Kenya: Mombasa |
| `Diani.jfif` | `diani.jfif` | Kenya: Diani Beach |
| `watamu.jfif` | `watamu.jfif` | Kenya: Watamu |
| `Malindi.webp` | `malindi.webp` | Kenya: Malindi |
| `lake-elementaita.jpg` | `lake-elementaita.jpg` | Kenya: Lake Elementaita |
| `Lake-Naivasha-National-Park.jpg` | `lake-naivasha.jpg` | Kenya: Lake Naivasha |
| `lake-nakuru.jpg` | `lake-nakuru.jpg` | Kenya: Lake Nakuru |
| `Hells-Gate-National.jpg` | `hells-gate.jpg` | Kenya: Hell's Gate National Park |
| `Fort_Jesus.jfif` | Not used directly — Mombasa image covers it |
| `Gedi_Ruins.jpg` | Not used directly — Malindi image covers it |

*Note: Fort Jesus and Gedi Ruins are landmarks within Mombasa and Malindi respectively. The Mombasa tusks photo and Malindi pillar photo are used as the primary images for those destinations. If you'd prefer Fort Jesus for Mombasa or Gedi Ruins for Malindi instead, let me know.*

## Files Modified

1. **`src/pages/Destinations.tsx`** — Add 8 new imports, replace `ph` for the 8 Kenya destinations that still use placeholders (Mombasa, Diani Beach, Watamu, Malindi, Lake Elementaita, Lake Naivasha, Lake Nakuru, Hell's Gate)

This will eliminate all remaining placeholder images on the Destinations page.

