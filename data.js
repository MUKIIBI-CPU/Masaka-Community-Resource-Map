// Masaka District coordinates (approximate center)
const MASAKA_CENTER = [-0.3333, 31.7333];

// Sample data for Masaka community resources
const resources = [
    // Health Centers in Masaka
    {
        id: 1,
        name: "Masaka Regional Referral Hospital",
        type: "health",
        contact: "+256 772 123456",
        coordinates: [-0.3291771100513089, 31.735874672898166],
        address: "Masaka Hill Road, Masaka",
        services: "General Hospital, Emergency Care, Maternity",
        icon: "hospital",
        imageUrl: "masaka_hospital.png"
    },
    {
        id: 2,
        name: "Kitovu Hospital",
        type: "health",
        contact: "+256 782 234567",
        coordinates: [-0.34422042210849635, 31.75730293611316],
        address: "Kitovu, Masaka",
        services: "Surgical Services, HIV Care, Pediatrics",
        icon: "hospital",
        imageUrl: "images/kitovu_hospital.png"
    },
    {
        id: 3,
        name: "Masaka Diocesan Medical Centre",
        type: "health",
        contact: "+256 752 345678",
        coordinates: [-0.3277204356455971, 31.76070096852421],
        address: "Nyendo, Masaka",
        services: "Primary Healthcare, Laboratory Services",
        icon: "first-aid",
        imageUrl: "images/masaka_diocesan_medical_centre.jpg"
    },
    {
        id: 4,
        name: "MAHIPSO Clinic",
        type: "health",
        contact: "+256 702 456789",
        coordinates: [-0.3258464176765264, 31.739711454146615],
        address: "Kyabakuza, Masaka",
        services: "Community Health, Outpatient Services",
        icon: "clinic-medical",
        imageUrl: "images/mahipso_clinic.jpg"
    },
    {
        id: 5,
        name: "Bulamu Hospital Masaka",
        type: "health",
        contact: "+256 762 567890",
        coordinates: [-0.3449026904886743, 31.737667276785473],
        address: "Nyendo-Ssenyange, Masaka",
        services: "General Medicine, Dental Care",
        icon: "hospital-alt",
        imageUrl: "images/bulamu_hospital_masaka.jpeg"
    },
    
    // Education Facilities in Masaka
    {
        id: 6,
        name: "Masaka Secondary School",
        type: "education",
        contact: "+256 772 678901",
        coordinates: [-0.35112974580526707, 31.737344769864027],
        address: "Masaka Town, Masaka",
        services: "O-Level & A-Level Education",
        icon: "school",
        imageUrl: "images/masaka_secondary_school.jpg"
    },
    {
        id: 7,
        name: "St. Henry's College Kitovu",
        type: "education",
        contact: "+256 782 789012",
        coordinates: [-0.3350077317608836, 31.762927272017638],
        address: "Kitovu, Masaka",
        services: "Secondary Education, Boarding",
        icon: "school",
        imageUrl: "images/st._henry's_college_kitovu.jpg"
    },
    {
        id: 8,
        name: "Uganda Martyrs University",
        type: "education",
        contact: "+256 752 890123",
        coordinates: [-0.35457430235563786, 31.740496210608242],
        address: "Nkozi Road, Masaka",
        services: "University Education, Degree Programs",
        icon: "university",
        imageUrl: "images/uganda_martyrs_university.png"
    },
    {
        id: 9,
        name: "Masaka Primary School",
        type: "education",
        contact: "+256 702 901234",
        coordinates: [-0.3445590973517695, 31.74264699798681],
        address: "Central Masaka, Masaka",
        services: "Primary Education",
        icon: "child",
        imageUrl: "images/masaka_primary_school.jpg"
    },
    {
        id: 10,
        name: "Blessed Sacrament Primary School",
        type: "education",
        contact: "+256 762 012345",
        coordinates: [-0.34797765486105103, 31.736294234593636],
        address: "Kimaanya, Masaka",
        services: "Primary Education, Nursery",
        icon: "child",
        imageUrl: "images/blessed_sacrament_primary_school.jpeg"
    },
    {
        id: 16,
        name: "Muteesa 1 Royal University",
        type: "education",
        contact: "+256 414 123456",
        coordinates: [-0.3212355668286626, 31.742195555843566],
        address: "Masaka Town, Masaka",
        services: "University Education, Degree Programs, Research",
        icon: "university",
        imageUrl: "images/muteesa_1_royal_university.jpg"
    },
    
    // Safety Facilities in Masaka
    {
        id: 11,
        name: "Masaka Central Police Station",
        type: "safety",
        contact: "+256 772 112233",
        coordinates: [-0.3434474277947143, 31.73604527434087],
        address: "Central Police Road, Masaka",
        services: "Police Services, Emergency Response",
        icon: "shield-alt",
        imageUrl: "images/masaka_central_police_station.jpg"
    },
    {
        id: 12,
        name: "Masaka Fire Station",
        type: "safety",
        contact: "+256 782 223344",
        coordinates: [-0.32649758206591645, 31.753727659796443],
        address: "Masaka Town, Masaka",
        services: "Fire Emergency Services",
        icon: "fire-extinguisher",
        imageUrl: "images/masaka_fire_station.jpg"
    },
    {
        id: 13,
        name: "Masaka District Local Government",
        type: "safety",
        contact: "+256 752 334455",
        coordinates: [-0.34399992026476023, 31.738315250399715],
        address: "District Headquarters, Masaka",
        services: "Local Administration, Security",
        icon: "landmark",
        imageUrl: "images/masaka_district_local_government.jpeg"
    },
    {
        id: 14,
        name: "Nyendo Police Post",
        type: "safety",
        contact: "+256 702 445566",
        coordinates: [-0.31702425798395667, 31.76251888445272],
        address: "Nyendo Trading Centre, Masaka",
        services: "Community Policing",
        icon: "shield-alt",
        imageUrl: "images/nyendo_police_post.png"
    },
    {
        id: 15,
        name: "Masaka Emergency Ambulance Services",
        type: "safety",
        contact: "+256 762 556677",
        coordinates: [-0.34420419331549923, 31.740432678186405],
        address: "Near Regional Hospital, Masaka",
        services: "Emergency Medical Transport",
        icon: "ambulance",
        imageUrl: "images/masaka_emergency_ambulance_services.jpeg"
    }
];