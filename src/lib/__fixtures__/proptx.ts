/* INVENTED RECORDS for building and testing without the live API. Every value
   here is made up: the addresses do not exist, the prices and remarks are
   fiction, and the photographs are flat colour fields generated in the repo.
   Nothing in this file came from the PropTx database. Rendered only when
   PROPTX_FIXTURE=1 outside production. */

import type { PropTxMedia, PropTxProperty } from "../proptx";

export const FIXTURE_PROPERTIES: PropTxProperty[] = [
  {
    ListingKey: "FIX0001", ListingId: "W0000001", ModificationTimestamp: "2026-10-01T12:00:00Z",
    StandardStatus: "Active", ListOfficeKey: "OFFICEFIX", ListOfficeName: "DANMAR EMPIRE REAL ESTATE CORP.",
    InternetEntireListingDisplayYN: true, InternetAddressDisplayYN: true,
    UnparsedAddress: "12 Example Crescent", StreetNumber: "12", StreetName: "Example", StreetSuffix: "Crescent",
    City: "Oakville", CityRegion: "1021 - FP Fixture Park", StateOrProvince: "ON", PostalCode: "L0L 0L0",
    ListPrice: 2450000, TransactionType: "For Sale", PropertyType: "Residential Freehold", PropertySubType: "Detached",
    BedroomsTotal: 4, BathroomsTotalInteger: 4, LivingAreaRange: "3000-3500", OwnershipType: "Freehold",
    ParkingTotal: 6, GarageType: "Attached", Basement: ["Finished", "Walk-Out"], HeatType: "Forced Air", Cooling: "Central Air",
    LotSizeArea: 60, LotSizeUnits: "Feet", TaxAnnualAmount: 9800, TaxYear: 2026,
    PublicRemarks: "Fixture record. An invented four-bedroom house on an invented crescent, used only to build and test the pages. Nothing about it is real.",
    Latitude: 43.45, Longitude: -79.68,
  },
  {
    ListingKey: "FIX0002", ListingId: "C0000002", ModificationTimestamp: "2026-09-28T09:30:00Z",
    StandardStatus: "Active", ListOfficeKey: "OFFICEFIX", ListOfficeName: "DANMAR EMPIRE REAL ESTATE CORP.",
    InternetEntireListingDisplayYN: true, InternetAddressDisplayYN: true,
    UnparsedAddress: "88 Sample Street Unit 2104", StreetNumber: "88", StreetName: "Sample", StreetSuffix: "Street",
    City: "Toronto", CityRegion: "Fixture Village",
    ListPrice: 6900, TransactionType: "For Lease", PropertyType: "Residential Condo & Other", PropertySubType: "Condo Apt",
    BedroomsTotal: 2, BathroomsTotalInteger: 2, LivingAreaRange: "1000-1199", OwnershipType: "Condominium",
    ParkingTotal: 1, HeatType: "Forced Air", Cooling: "Central Air",
    PublicRemarks: "Fixture record. An invented furnished two-bedroom suite for lease, used only to build and test the pages.",
    Latitude: 43.65, Longitude: -79.38,
  },
  {
    ListingKey: "FIX0003", ListingId: "N0000003", ModificationTimestamp: "2026-09-20T15:45:00Z",
    StandardStatus: "Active", ListOfficeKey: "OFFICEFIX", ListOfficeName: "DANMAR EMPIRE REAL ESTATE CORP.",
    InternetEntireListingDisplayYN: true, InternetAddressDisplayYN: true,
    UnparsedAddress: "400 Placeholder Road", StreetNumber: "400", StreetName: "Placeholder", StreetSuffix: "Road",
    City: "Vaughan", Community: "Fixture Business Park",
    ListPrice: 7250000, TransactionType: "For Sale", PropertyType: "Commercial", PropertySubType: "Industrial",
    BuildingAreaTotal: 24000, OwnershipType: "Freehold",
    LotSizeArea: 1.6, LotSizeUnits: "Acres", TaxAnnualAmount: 41200, TaxYear: 2025,
    NetOperatingIncome: 420000, CapRate: 5.8,
    PublicRemarks: "Fixture record. An invented single-tenant industrial building, used only to build and test the investment lens and the specification strip.",
    Latitude: 43.79, Longitude: -79.53,
  },
  {
    // address withheld: the page shows city and region only, and the slug carries no street
    ListingKey: "FIX0004", ListingId: "W0000004", ModificationTimestamp: "2026-09-18T11:00:00Z",
    StandardStatus: "Active", ListOfficeKey: "OFFICEFIX", ListOfficeName: "DANMAR EMPIRE REAL ESTATE CORP.",
    InternetEntireListingDisplayYN: true, InternetAddressDisplayYN: false,
    UnparsedAddress: "7 Hidden Lane", StreetNumber: "7", StreetName: "Hidden", StreetSuffix: "Lane",
    City: "King City", CityRegion: "Fixture Estates",
    ListPrice: 5995000, TransactionType: "For Sale", PropertyType: "Residential Freehold", PropertySubType: "Detached",
    BedroomsTotal: 5, BathroomsTotalInteger: 6, LivingAreaRange: "5000+", OwnershipType: "Freehold",
    ParkingTotal: 12, GarageType: "Attached", PoolFeatures: ["Inground"],
    PublicRemarks: "Fixture record. An invented estate whose address is withheld at the seller's instruction, used to test the withheld-address case.",
  },
  {
    // display permission off: never shown
    ListingKey: "FIX0005", ListingId: "W0000005", ModificationTimestamp: "2026-09-10T08:00:00Z",
    StandardStatus: "Active", ListOfficeKey: "OFFICEFIX", ListOfficeName: "DANMAR EMPIRE REAL ESTATE CORP.",
    InternetEntireListingDisplayYN: false, InternetAddressDisplayYN: true,
    UnparsedAddress: "1 Private Court", City: "Oakville",
    ListPrice: 1999000, TransactionType: "For Sale", PropertyType: "Residential Freehold", PropertySubType: "Semi-Detached",
    PublicRemarks: "Fixture record that must never render.",
  },
  {
    // the same address as FIX0001 in the same city: the slug gains the listing id
    ListingKey: "FIX0006", ListingId: "W0000006", ModificationTimestamp: "2026-09-05T08:00:00Z",
    StandardStatus: "Active", ListOfficeKey: "OFFICEFIX", ListOfficeName: "DANMAR EMPIRE REAL ESTATE CORP.",
    InternetEntireListingDisplayYN: "Y", InternetAddressDisplayYN: "Y",
    UnparsedAddress: "12 Example Crescent", City: "Oakville", CityRegion: "Fixture Park",
    ListPrice: 2200000, TransactionType: "For Sale", PropertyType: "Residential Freehold", PropertySubType: "Att/Row/Townhouse",
    BedroomsTotal: 3, BathroomsTotalInteger: 3, LivingAreaRange: "2000-2500", OwnershipType: "Freehold",
    PublicRemarks: "Fixture record. A second invented listing at the same invented address, used to test slug collisions.",
  },
];

export const FIXTURE_MEDIA: Record<string, PropTxMedia[]> = {
  FIX0001: [
    { MediaKey: "M1B", MediaURL: "/photos/fixture/b.jpg", Order: 2, PreferredPhotoYN: false, ImageSizeDescription: "Large" },
    { MediaKey: "M1A", MediaURL: "/photos/fixture/a.jpg", Order: 1, PreferredPhotoYN: true, ImageSizeDescription: "Large", ImageWidth: 1600, ImageHeight: 1000 },
    { MediaKey: "M1C", MediaURL: "/photos/fixture/c.jpg", Order: 3, PreferredPhotoYN: false, ImageSizeDescription: "Large" },
  ],
  FIX0002: [{ MediaKey: "M2A", MediaURL: "/photos/fixture/b.jpg", Order: 1, PreferredPhotoYN: true, ImageSizeDescription: "Large" }],
  FIX0003: [{ MediaKey: "M3A", MediaURL: "/photos/fixture/p.jpg", Order: 1, PreferredPhotoYN: true, ImageSizeDescription: "Large", ImageWidth: 800, ImageHeight: 1000 }],
  FIX0004: [{ MediaKey: "M4A", MediaURL: "/photos/fixture/a.jpg", Order: 1, PreferredPhotoYN: true, ImageSizeDescription: "Large" }],
};
