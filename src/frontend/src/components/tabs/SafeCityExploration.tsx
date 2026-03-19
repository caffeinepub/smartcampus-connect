import { Badge } from "@/components/ui/badge";
import { MapPin, ShieldCheck, Star } from "lucide-react";

interface Place {
  name: string;
  description: string;
  safetyRating: number;
  bestTime: string;
  crowdType: "Students" | "Families" | "Mixed";
  collegeVerified: boolean;
}

interface Category {
  emoji: string;
  title: string;
  accent: string;
  gradient: string;
  borderColor: string;
  places: Place[];
}

const categories: Category[] = [
  {
    emoji: "🏋️",
    title: "Fitness & Gyms",
    accent: "#ea580c",
    gradient: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
    borderColor: "#ea580c",
    places: [
      {
        name: "Modern Student Gyms",
        description:
          "Well-equipped local gyms near WIT and Solapur University offering affordable student membership plans with all major equipment.",
        safetyRating: 5,
        bestTime: "Morning 6–9 AM & Evening 5–8 PM",
        crowdType: "Students",
        collegeVerified: true,
      },
      {
        name: "Yoga & Wellness Centers",
        description:
          "Certified yoga studios offering group classes, meditation sessions, and wellness programs ideal for stress relief during exams.",
        safetyRating: 5,
        bestTime: "Morning 6–8 AM",
        crowdType: "Mixed",
        collegeVerified: true,
      },
      {
        name: "Solapur Sports Complex",
        description:
          "Government-run sports complex with courts for badminton, basketball, volleyball and indoor sports facilities at subsidized rates.",
        safetyRating: 4,
        bestTime: "Mornings & Weekends",
        crowdType: "Mixed",
        collegeVerified: false,
      },
      {
        name: "Siddheshwar Stadium Jogging Track",
        description:
          "Free public jogging track surrounding the stadium, popular with students and fitness enthusiasts. Well-lit and monitored.",
        safetyRating: 4,
        bestTime: "Morning 5:30–8 AM",
        crowdType: "Mixed",
        collegeVerified: true,
      },
    ],
  },
  {
    emoji: "🍽️",
    title: "Food & Student Hangout Centers",
    accent: "#d97706",
    gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
    borderColor: "#d97706",
    places: [
      {
        name: "MG Road Food Street",
        description:
          "Popular food street with verified hygienic stalls offering authentic local cuisine, chaats, and affordable student meals under ₹80.",
        safetyRating: 4,
        bestTime: "Evenings 5–10 PM",
        crowdType: "Mixed",
        collegeVerified: true,
      },
      {
        name: "Family Restaurants near WIT",
        description:
          "Well-known family dining restaurants within 2 km of Walchand Institute. Clean, well-lit environments perfect for group study meals.",
        safetyRating: 5,
        bestTime: "Lunch 12–2 PM & Dinner 7–10 PM",
        crowdType: "Families",
        collegeVerified: true,
      },
      {
        name: "Café Study Spots (CCD & Local Cafes)",
        description:
          "Café Coffee Day and popular local cafes with Wi-Fi, power outlets, and a quiet ambience for individual study or small group discussions.",
        safetyRating: 5,
        bestTime: "10 AM – 9 PM",
        crowdType: "Students",
        collegeVerified: true,
      },
      {
        name: "D-Mart & Mall Food Courts",
        description:
          "Air-conditioned food courts inside D-Mart commercial zones offering clean, variety-packed meals from multiple franchises at student-friendly prices.",
        safetyRating: 5,
        bestTime: "Afternoons & Weekends",
        crowdType: "Families",
        collegeVerified: false,
      },
    ],
  },
  {
    emoji: "🕌",
    title: "Spiritual & Peaceful Places",
    accent: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
    borderColor: "#7c3aed",
    places: [
      {
        name: "Siddheshwar Temple & Surroundings",
        description:
          "One of Solapur's most iconic spiritual landmarks. The temple premises offer peace, architectural beauty, and a calm environment for reflection.",
        safetyRating: 5,
        bestTime: "Early Morning 6–9 AM",
        crowdType: "Mixed",
        collegeVerified: true,
      },
      {
        name: "Peaceful Meditation Centers",
        description:
          "Certified meditation and mindfulness centers in Solapur offering drop-in sessions and structured programs for students dealing with academic stress.",
        safetyRating: 5,
        bestTime: "Morning & Evening Sessions",
        crowdType: "Mixed",
        collegeVerified: true,
      },
      {
        name: "ISKCON Temple (Nearby Region)",
        description:
          "Serene ISKCON temple in the nearby accessible region. Known for peaceful atmosphere, free prasadam, and organized spiritual programs.",
        safetyRating: 5,
        bestTime: "Evenings 5–8 PM & Sundays",
        crowdType: "Families",
        collegeVerified: false,
      },
      {
        name: "Lake & Temple Walking Paths",
        description:
          "Beautiful walking paths around Siddheshwar Lake connecting temple ghats. Perfect for morning walks and peaceful group strolls.",
        safetyRating: 4,
        bestTime: "Morning 6–9 AM & Evenings",
        crowdType: "Mixed",
        collegeVerified: true,
      },
    ],
  },
  {
    emoji: "🛍️",
    title: "Malls & Safe Social Zones",
    accent: "#2563eb",
    gradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    borderColor: "#2563eb",
    places: [
      {
        name: "D-Mart Commercial Area",
        description:
          "Large commercial area with supermarkets, eateries, and shops. Safe, well-monitored public zone ideal for group outings and grocery needs.",
        safetyRating: 5,
        bestTime: "10 AM – 9 PM Daily",
        crowdType: "Families",
        collegeVerified: true,
      },
      {
        name: "Central Solapur Shopping Mall",
        description:
          "Multi-storey shopping mall in central Solapur with branded stores, a food court, and entertainment zone. Well-staffed and CCTV covered.",
        safetyRating: 5,
        bestTime: "Afternoons & Weekends",
        crowdType: "Mixed",
        collegeVerified: true,
      },
      {
        name: "PVR / Cinema Complexes",
        description:
          "INOX and local multiplexes offering safe indoor entertainment. Fully air-conditioned, well-monitored, and great for de-stressing on weekends.",
        safetyRating: 5,
        bestTime: "Evening Shows 6–10 PM",
        crowdType: "Mixed",
        collegeVerified: false,
      },
      {
        name: "Branded Retail Streets",
        description:
          "Popular branded retail stretches in Solapur's commercial hubs with well-known fashion, electronics and lifestyle stores. Busy and safe.",
        safetyRating: 4,
        bestTime: "11 AM – 8 PM Daily",
        crowdType: "Mixed",
        collegeVerified: false,
      },
    ],
  },
  {
    emoji: "🎮",
    title: "Gaming & Recreation Zones",
    accent: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
    borderColor: "#0891b2",
    places: [
      {
        name: "Indoor Gaming Cafés",
        description:
          "Verified gaming cafes with high-end PCs, console setups, and fast internet. Popular among students for weekend gaming sessions.",
        safetyRating: 4,
        bestTime: "Afternoons & Weekends",
        crowdType: "Students",
        collegeVerified: true,
      },
      {
        name: "Bowling & Arcade Centers",
        description:
          "Bowling alleys and arcade gaming zones in Solapur's malls. Great for group fun, birthday celebrations, and post-exam relaxation.",
        safetyRating: 5,
        bestTime: "Evenings & Weekends",
        crowdType: "Mixed",
        collegeVerified: false,
      },
      {
        name: "Verified Snooker Clubs",
        description:
          "College-vetted snooker clubs that are safe, well-managed, and frequented by students. Avoid unverified parlors in the city.",
        safetyRating: 3,
        bestTime: "Afternoons 2–7 PM",
        crowdType: "Students",
        collegeVerified: true,
      },
      {
        name: "Sports Turf Grounds",
        description:
          "Artificial turf grounds available for hourly booking. Great for cricket, football, and friendly sports matches with friends.",
        safetyRating: 5,
        bestTime: "Evenings 4–9 PM & Weekends",
        crowdType: "Students",
        collegeVerified: true,
      },
    ],
  },
  {
    emoji: "🌿",
    title: "Nature & Relaxation Spots",
    accent: "#16a34a",
    gradient: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
    borderColor: "#16a34a",
    places: [
      {
        name: "Public Gardens & Parks",
        description:
          "Well-maintained public parks across Solapur with benches, walking paths, and green lawns. Ideal for reading, group study, or simply relaxing.",
        safetyRating: 4,
        bestTime: "Morning & Evening",
        crowdType: "Mixed",
        collegeVerified: true,
      },
      {
        name: "Siddheshwar Lake Walking Area",
        description:
          "Scenic lake-side promenade with a 2 km walking path, gardens, and beautiful water views. One of Solapur's most popular relaxation destinations.",
        safetyRating: 4,
        bestTime: "Morning 6–9 AM & Sunset 5–7 PM",
        crowdType: "Mixed",
        collegeVerified: true,
      },
      {
        name: "Open Grounds for Group Meetups",
        description:
          "Spacious open sports grounds near colleges that serve as perfect venues for group meetups, outdoor activities, and informal gatherings.",
        safetyRating: 4,
        bestTime: "Evenings 4–7 PM",
        crowdType: "Students",
        collegeVerified: false,
      },
      {
        name: "Sunrise / Sunset Viewpoints",
        description:
          "Elevated viewpoints around Solapur's outskirts offering breathtaking sunrise and sunset views. Best for photography enthusiasts and nature lovers.",
        safetyRating: 3,
        bestTime: "Sunrise 5:30–7 AM & Sunset 5:30–7 PM",
        crowdType: "Mixed",
        collegeVerified: false,
      },
    ],
  },
  {
    emoji: "💡",
    title: "Skill & Growth Places",
    accent: "#4338ca",
    gradient: "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)",
    borderColor: "#4338ca",
    places: [
      {
        name: "Coding Institutes & Training Centers",
        description:
          "Verified coding and tech training centers in Solapur offering courses in web dev, DSA, Python, and placement prep at affordable student fees.",
        safetyRating: 5,
        bestTime: "Weekday Evenings & Weekends",
        crowdType: "Students",
        collegeVerified: true,
      },
      {
        name: "Public Libraries (Solapur)",
        description:
          "Solapur's public libraries including the Central Library offer vast book collections, quiet study rooms, and free internet access for students.",
        safetyRating: 5,
        bestTime: "9 AM – 6 PM, Mon–Sat",
        crowdType: "Mixed",
        collegeVerified: true,
      },
      {
        name: "Seminar Halls & Convention Centers",
        description:
          "Convention halls and auditoriums that host regular technical seminars, career workshops, and industry events open to college students.",
        safetyRating: 5,
        bestTime: "Event-based (check schedule)",
        crowdType: "Students",
        collegeVerified: true,
      },
      {
        name: "Startup & Incubation Hubs",
        description:
          "Startup incubation centers in Solapur offering co-working space, mentorship, and networking events for budding student entrepreneurs.",
        safetyRating: 5,
        bestTime: "10 AM – 6 PM, Weekdays",
        crowdType: "Students",
        collegeVerified: true,
      },
    ],
  },
];

function StarRating({ rating, accent }: { rating: number; accent: string }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          style={{
            fill: i <= rating ? "#f59e0b" : "#e5e7eb",
            color: i <= rating ? "#f59e0b" : "#d1d5db",
          }}
        />
      ))}
      <span className="text-xs font-bold ml-1" style={{ color: accent }}>
        {rating}/5
      </span>
    </div>
  );
}

function CrowdBadge({ type }: { type: Place["crowdType"] }) {
  const config = {
    Students: { bg: "#dcfce7", text: "#166534", border: "#86efac" },
    Families: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
    Mixed: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  };
  const c = config[type];
  return (
    <span
      className="text-[11px] font-semibold px-2 py-0.5 rounded-full border"
      style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}
    >
      👥 {type}
    </span>
  );
}

function PlaceCard({
  place,
  borderColor,
}: {
  place: Place;
  borderColor: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)",
        borderLeft: `4px solid ${borderColor}`,
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(0,0,0,0.06)",
        borderLeftColor: borderColor,
        borderLeftWidth: "4px",
      }}
    >
      {/* College Verified badge top-right */}
      {place.collegeVerified && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{
            background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
            color: "#15803d",
            border: "1px solid #86efac",
          }}
        >
          <ShieldCheck className="w-3 h-3" />
          College Verified
        </div>
      )}

      <h4 className="font-bold text-sm text-gray-900 mb-1.5 pr-28 leading-tight">
        {place.name}
      </h4>
      <p className="text-xs text-gray-600 leading-relaxed mb-3">
        {place.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-gray-500 w-20 flex-shrink-0">
            Safety:
          </span>
          <StarRating rating={place.safetyRating} accent={borderColor} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-gray-500 w-20 flex-shrink-0">
            Best Time:
          </span>
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.05)",
              color: "#374151",
            }}
          >
            🕐 {place.bestTime}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-gray-500 w-20 flex-shrink-0">
            Crowd:
          </span>
          <CrowdBadge type={place.crowdType} />
        </div>
      </div>
    </div>
  );
}

export default function SafeCityExploration() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Hero Banner */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #064e3b 0%, #065f46 25%, #0f766e 50%, #0891b2 75%, #1d4ed8 100%)",
          minHeight: 180,
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #34d399 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)",
            transform: "translateY(40%)",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 px-8 py-8 flex items-center gap-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            🗺️
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                style={{
                  background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                  color: "#15803d",
                  border: "1px solid #86efac",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                <ShieldCheck className="w-3 h-3 mr-1" />
                COLLEGE RECOMMENDED
              </Badge>
              <Badge
                style={{
                  background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                  color: "#1e40af",
                  border: "1px solid #93c5fd",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                <MapPin className="w-3 h-3 mr-1" />
                SOLAPUR CITY
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1 leading-tight">
              Safe City Exploration — Solapur
            </h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
              College-verified safe places for freshers to explore, relax, and
              grow. Discover Solapur's best spots rated for safety, ambience,
              and student-friendliness.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div
          className="relative z-10 mx-8 mb-6 grid grid-cols-4 gap-3"
          style={{ marginTop: "-4px" }}
        >
          {[
            { label: "Total Places", value: "28", emoji: "📍" },
            { label: "Verified by College", value: "19", emoji: "✅" },
            { label: "Categories", value: "7", emoji: "🗂️" },
            { label: "Safety Avg", value: "4.5★", emoji: "⭐" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl px-3 py-2 text-center"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="text-lg">{s.emoji}</div>
              <div className="text-white font-bold text-base leading-tight">
                {s.value}
              </div>
              <div className="text-white/70 text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div
        className="flex flex-wrap gap-3 p-4 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)",
          border: "1px solid #a7f3d0",
        }}
      >
        <span className="text-xs font-bold text-gray-700 self-center">
          Legend:
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
              color: "#15803d",
              border: "1px solid #86efac",
            }}
          >
            <ShieldCheck className="w-3 h-3" /> College Verified
          </span>
          <span className="text-[11px] text-gray-500">
            — Officially vetted by WIT
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CrowdBadge type="Students" />
          <CrowdBadge type="Families" />
          <CrowdBadge type="Mixed" />
          <span className="text-[11px] text-gray-500">— Crowd type</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5"
                style={{ fill: "#f59e0b", color: "#f59e0b" }}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-500">
            — Safety rating (5 = Safest)
          </span>
        </div>
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <section key={cat.title}>
          {/* Category Header */}
          <div
            className="rounded-2xl p-4 mb-5 flex items-center gap-3 shadow-lg"
            style={{ background: cat.gradient }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {cat.emoji}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                {cat.title}
              </h2>
              <p className="text-white/80 text-xs">
                {cat.places.length} places ·{" "}
                {cat.places.filter((p) => p.collegeVerified).length} college
                verified
              </p>
            </div>
          </div>

          {/* Place Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cat.places.map((place) => (
              <PlaceCard
                key={place.name}
                place={place}
                borderColor={cat.borderColor}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Footer Note */}
      <div
        className="rounded-2xl p-5 text-center"
        style={{
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #dbeafe 100%)",
          border: "1px solid #a7f3d0",
        }}
      >
        <div className="text-2xl mb-2">🛡️</div>
        <h3 className="font-bold text-gray-800 mb-1">Stay Safe, Stay Smart</h3>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          These places are recommended and periodically reviewed by Walchand
          Institute of Technology. If you find a place unsafe, please report it
          through the Scam Alert Board so it can be reviewed and updated.
        </p>
      </div>
    </div>
  );
}
