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
        coordinates: [-0.3417, 31.7381],
        address: "Masaka Hill Road, Masaka",
        services: "General Hospital, Emergency Care, Maternity",
        icon: "hospital"
    },
    {
        id: 2,
        name: "Kitovu Hospital",
        type: "health",
        contact: "+256 782 234567",
        coordinates: [-0.3361, 31.7256],
        address: "Kitovu, Masaka",
        services: "Surgical Services, HIV Care, Pediatrics",
        icon: "hospital"
    },
    {
        id: 3,
        name: "Masaka Diocesan Medical Centre",
        type: "health",
        contact: "+256 752 345678",
        coordinates: [-0.3289, 31.7422],
        address: "Nyendo, Masaka",
        services: "Primary Healthcare, Laboratory Services",
        icon: "first-aid"
    },
    {
        id: 4,
        name: "Bishop Kivengere Memorial Clinic",
        type: "health",
        contact: "+256 702 456789",
        coordinates: [-0.3528, 31.7183],
        address: "Kyabakuza, Masaka",
        services: "Community Health, Outpatient Services",
        icon: "clinic-medical"
    },
    {
        id: 5,
        name: "St. Francis Naggalama Hospital Branch",
        type: "health",
        contact: "+256 762 567890",
        coordinates: [-0.3156, 31.7289],
        address: "Nyendo-Ssenyange, Masaka",
        services: "General Medicine, Dental Care",
        icon: "hospital-alt"
    },
    
    // Education Facilities in Masaka
    {
        id: 6,
        name: "Masaka Secondary School",
        type: "education",
        contact: "+256 772 678901",
        coordinates: [-0.3389, 31.7322],
        address: "Masaka Town, Masaka",
        services: "O-Level & A-Level Education",
        icon: "school"
    },
    {
        id: 7,
        name: "St. Henry's College Kitovu",
        type: "education",
        contact: "+256 782 789012",
        coordinates: [-0.3322, 31.7228],
        address: "Kitovu, Masaka",
        services: "Secondary Education, Boarding",
        icon: "school"
    },
    {
        id: 8,
        name: "Uganda Martyrs University",
        type: "education",
        contact: "+256 752 890123",
        coordinates: [-0.3556, 31.7556],
        address: "Nkozi Road, Masaka",
        services: "University Education, Degree Programs",
        icon: "university"
    },
    {
        id: 9,
        name: "Masaka Primary School",
        type: "education",
        contact: "+256 702 901234",
        coordinates: [-0.3422, 31.7456],
        address: "Central Masaka, Masaka",
        services: "Primary Education",
        icon: "child"
    },
    {
        id: 10,
        name: "Blessed Sacrament Primary School",
        type: "education",
        contact: "+256 762 012345",
        coordinates: [-0.3256, 31.7356],
        address: "Kimaanya, Masaka",
        services: "Primary Education, Nursery",
        icon: "child"
    },
    {
        id: 16,
        name: "Muteesa 1 Royal University",
        type: "education",
        contact: "+256 414 123456",
        coordinates: [-0.3300, 31.7500],
        address: "Masaka Town, Masaka",
        services: "University Education, Degree Programs, Research",
        icon: "university"
    },
    
    // Safety Facilities in Masaka
    {
        id: 11,
        name: "Masaka Central Police Station",
        type: "safety",
        contact: "+256 772 112233",
        coordinates: [-0.3378, 31.7367],
        address: "Central Police Road, Masaka",
        services: "Police Services, Emergency Response",
        icon: "shield-alt"
    },
    {
        id: 12,
        name: "Masaka Fire Station",
        type: "safety",
        contact: "+256 782 223344",
        coordinates: [-0.3400, 31.7400],
        address: "Masaka Town, Masaka",
        services: "Fire Emergency Services",
        icon: "fire-extinguisher"
    },
    {
        id: 13,
        name: "Masaka District Local Government",
        type: "safety",
        contact: "+256 752 334455",
        coordinates: [-0.3356, 31.7311],
        address: "District Headquarters, Masaka",
        services: "Local Administration, Security",
        icon: "landmark"
    },
    {
        id: 14,
        name: "Nyendo Police Post",
        type: "safety",
        contact: "+256 702 445566",
        coordinates: [-0.3283, 31.7267],
        address: "Nyendo Trading Centre, Masaka",
        services: "Community Policing",
        icon: "shield-alt"
    },
    {
        id: 15,
        name: "Masaka Emergency Ambulance Services",
        type: "safety",
        contact: "+256 762 556677",
        coordinates: [-0.3433, 31.7394],
        address: "Near Regional Hospital, Masaka",
        services: "Emergency Medical Transport",
        icon: "ambulance"
    }
];