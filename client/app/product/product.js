//controller for product page TODO maybe later
// angular.module('shoppingApp')
//    .controller('productCtrl', ['$http', function ($http) {
//       var vm = this;
//       vm.msg = "Inside product controller......";
// }]);
const StateList = [
   { country: 'US', state: ['CA', 'NV', 'OR' ] },
   { country: 'China', state: ['Canton', 'Sichuan', 'Shandong' ] },
   { country: 'Canada', state: ['Ontario', 'Alberta', 'Quebec' ] }
];
const CityList = [
   { state: 'CA', city: ['San Francisco', 'San Jose', 'Los Angeles' ] },
   { state: 'NV', city: ['Las Vegas', 'Reno', 'Carson City' ] },
   { state: 'OR', city: ['Portland', 'Salem', 'Beaverton' ] },
   { state: 'Canton', city: ['Guangzhou', 'Foshan', 'Shenzhen' ] },
   { state: 'Shandong', city: ['Jinan', 'Qingdao', 'Yantai' ] },
   { state: 'Sichuan', city: ['Chengdu', 'Mianyang', 'Nanchong' ] },
   { state: 'Ontario', city: ['Upland', 'Pomona', 'Fontana' ] },
   { state: 'Alberta', city: ['McMurray', 'Edmonton', 'Calgary' ] },
   { state: 'Quebec', city: ['Wendake', 'Shannon', 'Beaumont' ] }
];
const Category = ["All Categories",
   "Sports & Outdoor", "Travel Accessory", "Camping Gear", "Pool/Beach Accessory", "Home Accessory",
   "Wearable Tech", "Presentation Gadget", "Computer Accessory", "Workspace Gadget", "Bedtime product", "Smart Living",
   "Storage & Orgnization", "3D Printing", "Home Media", "Smart Home", "Luxury", "For Kids", "Time Keeping",
   "Glow & Light", "Loss Prevention & Security", "Car Accessory", "Smart Phone & Accessory", "Party Accessory", "Robot"
];
const ProductData = [
   { id: 1000, name: "Day and Night Vision Laser Binoculars", shortDescription: "",
      category: ["Sports & Outdoor", "Travel Gadget"],
      description: "Traditional night vision goggles are expensive, don’t magnify. " +
         "But the Day and Night Vision Laser Binoculars give you " +
         "8X magnification at any hour, at an affordable price! By day, they’re rugged, " +
         "solid and provide a sharp up-close view for sports and other outdoor activities. " +
         "When the sun goes down, simply push a button to activate a wideangle green laser " +
         "that illuminates even the darkest areas, up to 150 yards away. " +
         "Features an easy-to-use center focus wheel, right eye focus adjustment, water-resistant " +
         "armor and tripod socket.Get 8X magnification… day or night! The Day and Night Vision Laser " +
         "Binoculars give you a clear view at a great price!",
      price: 159.99, inventory: -10, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/binocular-night/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.png", "v7.png"],
      feature: [ "Rugged binoculars for day or nighttime use",
         "Tripod socket accommodates all standard tripods", "32mm objective lenses",
         "Spot diameter 4m @ 50m", "Field of view: 294′ @ 1,000 yds.", "Minimum focus distance: 13′",
         "Exit pupil size: 4mm", "Eye relief: approx. 12.5mm", "Relative brightness index: 17.36",
         "Twilight factor: 24.49", "Batteries provide up to 2.5 hours of continuous use", "Requires 2 AAA batteries",
      ]
   },
   { id: 1010, name: "Backtab Portable Comfortable Backrest", shortDescription: "",
      category: ["Camping Gear", "Beach Accessory"],
      description: "Take a load off anywhere you go when you have the Backtab Portable Comfortable Backrest. " +
      "Designed to go anywhere you go, this device offers total support and comfort. The Backtab is extremely easy to use. " +
      "Simply unfold and take a seat. The Backtab features a highly durable hinge system. " +
      "In fact, this strong material is the same stuff used for helicopter rotor blades. " +
      "In addition, the back of the Backtab uses CNC-machined 'claws' to keep the entire system upright. " +
      "You can rest the full weight of your upper body with total peace of mind. " +
      "It rolls out to cover the ground and give you a clean seat. " +
      "the Backtab can truly go anywhere.",
      price: 53, inventory: 8, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/backtab/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg"],
      feature: [ "10.2 x 7.1 x 0.75 Inches", "Water Repellent, Corrosion Resistant, Customizable", "Glass Fiber Reinforced Plastic, PVC",
         "Measuring only 10.2 inches long, the size of an average tablet", "Water-repellent, tear-proof material",
         "Glass fiber reinforced plastic", "Strong stainless steel hinges", "Highly durable hinge system",
      ]
   },
   { id: 1020, name: "Doogee Mix Bezel-Less Smartphone", shortDescription: "",
      category: ["Smart Phone & Accessory"],
      description: "See your apps in all their glory with the Doogee Mix Bezel-Less Smartphone. " +
      "This device shakes off the frame, so that your videos and photos stretch from edge to edge. " +
      "Furthermore, the 5.5-inch Samsung Super AMOLED display offers amazing detail and rich colors. " +
      "Because there is no bezel, this phone is much smaller than most devices with the same screen size. " +
      "Despite its compact form, the Mix is seriously powerful. " +
      "The octa-core Helio P25 CPU can handle multi-tasking at speed, and the phone has 6GB of RAM. " +
      "You also get all-day battery life with quick charge technology. " +
      "Dual cameras allow you to take DSLR-quality photos in any light, and you get the latest version of Android to play with. " +
      "Finally, the Mix provides an incredible 128GB of storage space. " +
      "If you want top performance, this phone certainly fits the bill.",
      price: 169.99, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/doogee/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg", "v9.jpg"],
      feature: [ "Bezel-Less with contents stretch from edge to edge", "5.5-inch Samsung Super AMOLED display",
         "octa-core Helio P25 CPU", "6GB of RAM", "Dual cameras", "128GB of storage", "Android powered" ]
   },
   { id: 1030, name: "Vivowake Anti-Drowsiness Smartband", shortDescription: "",
      category: ["Wearable Tech"],
      description: "Combat the drowsiness from your every day with the Vivowake Anti-Drowsiness Smartband. " +
      "This wearable uses two sensors to keep you awake and alert. The Vivowake capsule sits inside the included wristband. " +
      "The Vivowake Smartband is ideal for drivers, security guards, operators, or any time when drowsiness can impact your ability. " +
      "When Vivowake detects drowsiness, it instantly sends an alert to your wrist. " +
      "If your body doesn’t wake up sufficiently after this alert, the wearable will deliver more consistent alerts. " +
      "With each, your body becomes more awake and you can be more aware.",
      price: 31, inventory: 65, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/vivowake/",
      images: ["v1.jpg", "v2.jpg", "v3.jpeg", "v4.gif", "v5.jpg", "v6.jpg", "v7.jpg"],
      feature: [ "Uses two sensors to keep you awake and alert", "Alert 3 to 8 minutes before your body begins to fall asleep",
         "Ideal for drivers, security guards, operators", "Sensors underneath monitor your skin and detect early " +
         "signs of weakening human response." ]
   },
   { id: 1040, name: "Q – The Affordable Smart Wallet", shortDescription: "",
      category: ["Travel Accessory"],
      description: "Keep your most valuable items safe and sound with the Q Ultra Compact Smart Wallets. " +
      "These wallets come in two models which offer superior protection for your goods. " +
      "The Q-BLOQ features RFID-blocking technology so you won’t fall victim to data theft. " +
      "In fact, the Q-BLOQ provides two layers of this material for each card for even more security. " +
      "In addition, the Q-TRAQ is complete with Bluetooth tracking capability. " +
      "Connecting to the app on your smartphone, the Q-TRAQ features a CHIPOLO tracking chip for ultra-precise location tracking. " +
      "You can ring your wallet to find it, use your wallet to find your smartphone, and even see your wallet on a map. " +
      "The CHIPOLO chip has a 12-month battery life so you get total peace of mind. " +
      "Both models have loads of storage space yet remain totally slim even when full.",
      price: 100, inventory: -10, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/q-ultra/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"],
      feature: [ "Q-BLOQ features RFID-blocking technology", "Provides two layers of this material",
         "The Q-TRAQ is complete with Bluetooth tracking capability", "Features a CHIPOLO tracking chip for ultra-precise location tracking",
         "CHIPOLO chip has a 12-month battery life", "Loads of storage space yet remain totally slim"
      ]
   },
   { id: 1050, name: "Ring Mouse with Laser Pointer", shortDescription: "",
      category: ["Presentation Gadget", "Computer Accessory", "Workspace Gadget"],
      description: "Imagine a mouse that fits on your index finger! " +
      "The rechargeable Ring Mouse With Laser Pointer lets you wirelessly control PowerPoint presentations, " +
      "slide shows and web pages from up to 33 feet away. Flip a switch and this handy mouse becomes a laser pointer. " +
      "Worry-free 2.4GHz technology gives you reliable cursor and clicking control when the pressure’s on! " +
      "Charges via USB with included cable. System requirements: Windows 7/Vista/XP or Mac OSX 10.6+.",
      price: 100, inventory: 214, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/ring-mouse/",
      images: ["v1.jpg", "v2.jpg"],
      feature: [ "Wireless connectivity with 33’ range", "Built-in laser pointer",
         "Mouse ring fits comfortably on the index finger", "Control the cursor and click with your thumb",
         "Adjustable cursor speed", "Low-battery indicator", "Charges via USB with included cable",
         "USB Pico receiver plugs into mouse port on PC or Mac", "Worry-free 2.4GHz technology"
      ]
   },
   { id: 1060, name: "Senstone Sensitive Voice Tracker", shortDescription: "",
      category: ["Wearable Tech", "Workspace Gadget"],
      description: "Never lose a great idea again when you have the Senstone Wearable Voice Recorder. " +
      "This compact device attaches right to your gear or clothing and is always ready to record. " +
      "Senstone offers an intuitive and easy to use interface. Simply tap the device and speak. " +
      "Senstone will instantly begin recording your audio to keep your notes, ideas, and thoughts safe and sound. " +
      "Because you wear the device, Senstone is more efficient than paper and pen or even a smartphone app. " +
      "From there, Senstone automatically converts your speech into text and organizes your notes. In addition, " +
      "Senstone works with third party apps and can include tags as well as location information. Totally wireless, " +
      "Senstone is compatible with a dozen languages. Senstone can be worn as a necklace or a bracelet. " +
      "Thanks to its beautiful design, it integrates seamlessly into your style and daily life.",
      price: 100, inventory: 27, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/senstone/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg"],
      feature: [ "attaches right to your gear", "instantly begin recording your audio to keep your notes",
         "automatically converts your speech into text and organizes your notes", "Totally wireless, compatible with a dozen languages",
         "integrates seamlessly into your style and daily life"
      ]
   },
   { id: 1070, name: "Smartduvet Breeze Self-Making Temperature Bed", shortDescription: "",
      category: ["Bedtime product", "Smart Living"],
      description: "Turn your bed into a smart bed with the " +
      "Smartduvet Breeze Self-Making Temperature Bed. This system has so many intelligent features to make your life easier. " +
      "Firstly, the Smartduvet Breeze features dual-zone temperature control. " +
      "Both you and your partner can determine the perfect climate for sleeping to achieve total comfort. " +
      "Some like it cool and some like it hot. Either way, the Smartduvet Breeze does it all. " +
      "In addition to climate control, this smart system removes humidity, prevents bed bugs, and reduces sweating. " +
      "If that’s not enough, the Smartduvet Breeze actually makes your bed for you. " +
      "Incredibly, it uses an inflation system to lift the duvet back to its original position. " +
      "The Smartduvet Breeze is the ultimate bedtime accessory to ensure the best night’s sleep.",
      price: 179, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/duvet/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg"],
      feature: [ "Dual-zone temperature control", "Smart system removes humidity",
         "Prevents bed bugs, and reduces sweating", "Uses an inflation system to lift the duvet back to its original position"
      ]
   },
   { id: 1080, name: "TAP-TAB Magnetic Organization System", shortDescription: "",
      category: ["Home Accessory", "Storage & Orgnization"],
      description: "Tidy up your everyday life with the TAP-TAB Magnetic Organization System. " +
      "Featuring ultra-strong magnets, this system allows you to hang and store your clothing, towels, " +
      "accessories, notes, ideas, and more. TAP-TAB comes with the stylish TAP-TAB Board and special magnet loops. " +
      "The loops, which work in a pair, mount on the inside and outside of a garment or object without creating any holes. " +
      "With the magnets in place, you can simply toss your items onto the Board and they will magnetically stick in place. " +
      "With TAP-TAB, you can achieve total organization in any space. " +
      "You can hang the durable Board just like a picture frame or use double sided tape. " +
      "It’s perfect for the kitchen, entryway, your bedroom, and even the bathroom. " +
      "Say goodbye to heaps of jackets and coats, untidy piles of towels, and messy accessories. " +
      "TAP-TAB does all the heavy lifting (and hanging) for you.",
      price: 25, inventory: 855, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/tap-tab/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg"],
      feature: [ "Ultra-strong magnets", "Hang and store your clothing, towels, accessories, notes, ideas...etc",
         "stylish TAP-TAB Board and special magnet loops", "Toss your items onto the Board and they will magnetically stick in place",
         "Perfect for the kitchen, entryway, your bedroom, and even the bathroom"
      ]
   },
   { id: 1090, name: "Scribbler DUO Dual Nozzle 3D Printing Pen", shortDescription: "",
      category: ["3D Printing"],
      description: "Unleash your endless creativity with the Scribbler DUO Dual Nozzle 3D Printing Pen. " +
      "This incredible device allows you to create 3D designs all with your hand. " +
      "As a tool of the 21st century, the Scribbler DUO unlocks your creative world. " +
      "Simply place your filament inside and get making. As you draw, your idea turns into a 3D structure. " +
      "In addition, the Scribbler DUO has a dual nozzle design. With two active nozzles, " +
      "you can create faster than ever before. You have the option to use multiple colors to add another layer of dimension. " +
      "The pen itself is ergonomic and comfortable to use. " +
      "Additionally, it’s totally safe and clean. Complete with a lightweight design, " +
      "the 1.75mm filament inside is also affordable. You have 6 speeds to choose from as well as a " +
      "temperature adjustment toggle for unprecedented control.",
      price: 60, inventory: 341, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/scribbler/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg", "v9.jpg"],
      feature: [ "Create 3D designs all with your hand", "As you draw, your idea turns into a 3D structure",
         "Dual nozzle design", "Use multiple colors to add another layer of dimension",
         "Rrgonomic pen is comfortable to use", "Totally safe and clean with a lightweight design",
         "Inexpensive 1.75mm filament", "6 speeds with temperature adjustment"
      ]
   },
   { id: 1100, name: "CUJO Smart Home Firewall Device", shortDescription: "",
      category: ["Home Media", "Smart Home"],
      description: "Protect your entire connected home with the CUJO Smart Home Firewall Device. " +
      "This flawless system creates a personal firewall right at home. When in use, " +
      "CUJO protects devices such as your laptop, smartphone, tablet, and more against online threats. " +
      "CUJO even works with gaming consoles. " +
      "Complete with a cute face, CUJO offers business-level internet security and " +
      "hackers don’t stand a chance. It connects to your home’s Wi-Fi router and you " +
      "can manage it through the companion app. " +
      "It effortlessly safeguards all of your devices all at the same time." +
      " However, it will never slow down your network so you can browse with total peace of mind. " +
      "In addition to protection, you also get parental controls. " +
      "Within the app, you can block certain websites, restrict time, and much more.",
      price: 249, inventory: 37, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/cujo/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"],
      feature: [ "Creates a personal firewall right at home", "Protects devices such as your laptop, smartphone, tablet",
         "Offers business-level internet security", "Connects to your home’s Wi-Fi router",
         "Will never slow down your network", "Features parental controls to block certain websites, restrict time"
      ]
   },
   { id: 1110, name: "Fred One-Touch Smart Home Mirror", shortDescription: "",
      category: ["Home Media", "Smart Home", "Luxury"],
      description: "Start each day off smart when you have the Fred One-Touch Smart Home Mirror. " +
      "With a tap, this smart home device tells you everything you need to know for the day. " +
      "It prominently displays the date as well as the time. " +
      "It also gives you the local weather and refreshes with real-time updates. " +
      "It can even access your preferred news channels so you can be informed before you even leave. " +
      "The state-of-the-art system also pumps out your favorite tunes. " +
      "But, the Fred Mirror does so much more. It features a built-in air purifying module. " +
      "It takes in air and releases optimized, germ-free fresh air. " +
      "It also works to deodorize the air. Finally, the mirror is also steam-free. " +
      "No matter how hot your shower, the Fred Mirror gives you a crystal clear reflection.",
      price: 1950, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/mirror/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg"],
      feature: [ "Tells you everything you need to know for the day with one tap",
         "Displays the date, time and local weather in real time",
         "Access your preferred news channels", "Play your favorite tunes",
         "Built-in air purifying module", "The mirror is steam-free"
      ]
   },
   { id: 1120, name: "Wobblrs - Soccer-Specific Tailgate Game", shortDescription: "",
      category: ["Sports & Outdoor", "For Kids"],
      description: "Ramp up the pre-game excitement with Wobblrs – " +
      "the first soccer-specific tailgate game. It’s designed by soccer fans for soccer fans " +
      "and a game that you’ll want to play with friends for hours. " +
      "Coming in a set of two, the Wobblrs stand 11 steps apart. " +
      "You can play 1v1 or 2v2 and the goal is to hit your opponent’s Wobblrs by " +
      "kicking it with a soccer ball. Incredibly, each Wobblr uses its high-quality plastic " +
      "and aluminum design to always self-right. So, when you hit the pylon, " +
      "it won’t knock over but will be obvious that you’ve made contact. " +
      "This eliminates the need to reset the pin manually after a successful hit. " +
      "You must hit your opponent’s Wobblr to get a point but be careful to not knock over your own! " +
      "The first team to 11 points wins, however; you must win by at least 2 points. " +
      "Expand your tailgating experience while ramping up the anticipation before the big game.",
      price: 35, inventory: 150, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/wobblr/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.gif", "v5.jpg", "v6.jpg", "v7.jpg"],
      feature: [ "Soccer-specific tailgate game", "A set of two, stand 11 steps apart",
         "Kicking other team's wobblr via a soccer ball",
         "Plastic and aluminum design to always self-right", "The first team to 11 points wins"
      ]
   },
   { id: 1130, name: "Constellation Watch", shortDescription: "",
      category: ["Wearable Tech", "Time Keeping"],
      description: "The more you know about astronomy, the more you’ll love the newly redesigned " +
      "Constellation Watch. In addition to the current time, this quartz analog watch displays " +
      "a wealth of astronomical data about the Northern Hemisphere, including positions of the " +
      "constellations, plus the azimuth and altitude of the major fixed stars, nebulae and star " +
      "clusters, local sidereal time, stellar spectral type, pole star hour angle and hours " +
      "for astronomical twilight. You can even use the Constellation Watch to align your telescope " +
      "to the polar axis. Features 42mm stainless steel case, 20mm black silicone rubber strap and " +
      "heavy duty stainless steel buckle..",
      price: 189.99, inventory: 8, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/constellation/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg"],
      feature: [ "Designed to show the night sky of the Northern Hemisphere",
         "Constellation dial displays almost all of the celestial sphere (approximately 98.6%) visible at 35 deg. " +
         "north latitude (–55.57deg. to +77.06deg. declination)",
         "The constellation display includes the positions of 1,056 fixed stars with a brightness of 4.8 magnitude or brighter, 169 major nebulae and star clusters, delimitation of constellations, the ecliptic and celestial " +
         "equator based on their positions for the year 2000.0.",
         "The position of the sun is shown in a broken line along the ecliptic on the 1st, 11th, and 21st of each month",
         "Examine the horizon line on the crystal underprint to determine times for sunrise and sunset as well as the number of daylight hours",
         "Local sidereal time can be designated by reading the right ascension graduations on the constellation dial that intersect with the meridian on the transparent dial",
         "Hour angle display of the pole star lets you align an astronomical telescope to the polar axis",
         "100% Japan movement", "3 ATM water resistance", "Beautiful, reusable gift box",
         "42mm stainless steel case (steel is high-quality surgical grade 316L)",
         "20mm black silicone rubber strap with heavy duty stainless steel buckle",
         "Battery included"
      ]
   },
   { id: 1140, name: "Bluetooth Digital Pen", shortDescription: "",
      category: ["Workspace Gadget", "Smart Living"],
      description: "The Bluetooth Digital Pen automatically captures handwritten notes and drawings, " +
      "and saves them as digital files! Simply clip the small receiver to the top of your notepad " +
      "and write or draw as you would with a regular ballpoint pen. " +
      "Your notes and drawings will be saved as digital files. Includes two free " +
      "apps (MemoPlus and CloudMemo+) and Black ink cartridge. Extra ink cartridges " +
      "available atSharperImage.com. Compatible with iPhone/iPad and Galaxy/Android.",
      price: 59.99, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/digipen/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg"],
      feature: [ "Clip the small receiver to the top of your notepad",
         "Write or draw normally with the premium ballpoint + digital device",
         "Pen writes in black ballpoint ink",
         "Notes and drawings are captured instantly as digital files",
         "Makes your notes more useful by integrating them with your daily activities",
         "Easy sharing options let you send notes to a variety of apps, services and social media",
         "Includes two free apps for your iPhone/iPad or Galaxy/Android",
         "MemoPlus - Smart Pen (Shenzhen Yifang Digital Technology): Captures handwritten notes as JPEG files and also records the real-time writing process as a video clip that can be shared to social networks. Requires Android OS 4.0+ or iOS 8.0+",
         "CloudMemo+ (Shenzhen Yifang Digital Technology): Captures and digitizes handwritten notes to your smartphone so they can be shared on social networks. Requires Android OS 4.3+ or iOS 7.0+",
         "Extra ink cartridges available at SharperImage.com (Item No. 205052)",
         "Receiver and pen charge at the same time with the included USB cable",
      ]
   },
   { id: 1150, name: "INNO LUMI Smart Lighting System", shortDescription: "",
      category: ["Home Accessory", "Smart Home", "Smart Living"],
      description: "Introducing the INNO LUMI Smart Lighting System which gives you all the control to achieve the best lighting. " +
      "INNO LUMI is a suite of smart lighting products providing effortless control of home lighting systems. " +
      "It features an elegantly simple remote control as well as a range of LED bulbs and light strips. " +
      "INNO LUMI enables the transformation of the humble home lighting into a sophisticated mood enhancer " +
      "in the most uncomplicated and straightforward manner. In addition, the INNO LUMI remote is a specialized device " +
      "that is designed to deliver a single function and provides one-directional command driven light control " +
      "similar to the control of your TV. The system takes just seconds to setup and has no requirement for Wi-FI, ZigBee, " +
      "gateway, Bluetooth, or a smartphone. With the remote, you can control 96 different sets of lights. " +
      "Additionally, you can do more than just dim. You can adjust the color temperature, colors, and access a variety " +
      "of light mode profiles. The INNO LUMI Remote uses minimal power and gives you total clarity for ease of use.",
      price: 54, inventory: 35, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/inno-lumi/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg"],
      feature: [ "Gives you all the control to achieve the best lighting",
         "Smart lighting products providing effortless control of home lighting systems",
         "Simple remote control as well as a range of LED bulbs and light strips",
         "Takes just seconds to setup and has no requirement for Wi-FI",
         "Can control 96 different sets of lights",
         "Adjust the color temperature, colors, and access a variety of light mode profiles",
         "Remote uses minimal power and ease of use"
      ]
   },
   { id: 1160, name: "Zing Smart AI Night Light", shortDescription: "",
      category: ["Home Accessory", "Smart Home", "Smart Living", "Glow & Light"],
      description: "Introducing the Zing Smart AI Night Light, a smart path lighting system for your home. " +
      "Individually, each Zing is an awesome, full-color LED night light that plugs directly into your outlet " +
      "to give you tons of convenient features. These include smartphone control, light effects and blue light reduction" +
      " — which helps your body ready itself for sleep. It also keeps you from becoming too alert during late night trips to the bathroom. " +
      "The billions of color options are just the tip of the iceberg. Zing can act as a visual indicator for incoming calls " +
      "and other smartphone events. When used together as a system, multiple Zing lights learn " +
      "and automatically illuminate your path without the need for manual configuration. " +
      "Conversely, Zing can notify you of unusual and suspicious motion activities via push notifications on your phone.",
      price: 36, inventory: 150, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/zing/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg"],
      feature: [ "smart path lighting system",
         "Full-color LED night light that plugs directly into your outlet",
         "Smartphone control, light effects and blue light reduction",
         "Billions of color options",
         "A visual indicator for incoming calls and other smartphone events",
         "Automatically illuminate your path when used together as a system",
         "Notify you of unusual and suspicious motion activities on your phone"
      ]
   },
   { id: 1170, name: "Mu Tag Loss Prevention Device", shortDescription: "",
      category: ["Loss Prevention & Security", "Smart Living", "Travel Gadget"],
      description: "Keep track of even the smallest items with the Mu Tag Loss Prevention Device. " +
      "This compact electronic tag is an intelligent flexible chip. Pairing with an app, it lets you " +
      "always keep an eye on your gear. The Mu Tag is extremely small yet powerful. You can put it on " +
      "anything from your car to your luggage to your passport. Mu Tag works with the app to give you a " +
      "virtual leash to your belongings. You can set your notifications to know if you ever leave an item " +
      "behind or if is stolen. In addition, the Mu Tag and app are incredibly smart. They remember safe " +
      "locations so you only get notified when something important happens. It even syncs to your calendar " +
      "to determine safe locations. Finally, each tag has a rechargeable and replaceable battery. " +
      "This design allows you to swap out batteries that last up to three months each.",
      price: 25, inventory: 850, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/mutag/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg"],
      feature: [ "smart path lighting system",
         "Keep track of even the smallest items",
         "Put it on anything from your car to your luggage to your passport",
         "You can set your notifications",
         "Each tag has a rechargeable and replaceable battery",
         "App remembers safe locations so you only get notified when something important happens",
         "This compact electronic tag is an intelligent flexible chip"
      ]
   },
   { id: 1180, name: "HUDWAY Glass – Keep Your Eyes On the Road", shortDescription: "",
      category: ["Car Accessory", "Smart Phone & Accessory"],
      description: "In the days of smartphones with tweets, texts, selfies, and phone calls, " +
      "HUDWAY Glass makes sure you keep your eyes on the road. HUDWAY Glass is a universal driving " +
      "accessory that turns your smartphone into a concise Head-Up Display at eye level. " +
      "Displaying clear directions and information, such as the path of the road or your speed, " +
      "from your phone, HUDWAY Glass keeps your hands on the wheel and your eyes focused on what’s ahead. " +
      "Because it’s self-contained and not reliant on your windshield, there’s no risk of image doubling, " +
      "glare, or poor image size to disrupt your journey. The multi-layered glass coating is transparent " +
      "to ensure your view is never obstructed. Two mounts are available with HUDWAY Glass; " +
      "a compact 5mm mount and a 30-degree tilting mount.",
      price: 49.95, inventory: 62, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/hudway/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpeg"],
      feature: [ "Keep your eyes on the road",
         "A universal driving accessory that turns your smartphone into a concise Head-Up Display at eye level",
         "Displaying path of the road or your speed",
         "No glare or poor image size to disrupt your journey",
         "The multi-layered glass coating is transparent to ensure your view is never obstructed",
         "Two mounts are available: 5mm mount and a 30-degree tilting mount"
      ]
   },
   { id: 1190, name: "Bierstick Revolutionary Drinking Device", shortDescription: "",
      category: ["Beach accessory", "Party Accessory"],
      description: "Enjoy your brew in a whole new way with the Bierstick Revolutionary Drinking Device. " +
      "This beer bong delivers your favorite beer in a fun and expeditious way. " +
      "The Bierstick is a syringe-like beer bong. It holds up to 24 ounces of beer which you can, " +
      "quite literally, inject into your mouth. Perfect for tailgating and parties, " +
      "the Bierstick ensures there’s no foam. To fill, simply remove the cap and pour in your beer. " +
      "Replace the cap and use the Bierstick just like a syringe. " +
      "You can go at your own pace to enjoy the flavor or put the power in your friend’s hands. " +
      "The innovative friction fit mouthpiece ensures no foam or carbonation. " +
      "It works best by pressing against the chest of your friend to help push the syringe. " +
      "Or, you can simply use the wall. With Bierstick, any type of beer just got a whole lot more fun.",
      price: 19.95, inventory: 975, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/bierstick/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg"],
      feature: [ "Special Drinking Device",
         "Delivers your favorite beer in a fun and expeditious way",
         "A syringe-like beer bong", "Holds up to 24 ounces of beer", "Ensures there’s no foam",
         "Innovative friction fit mouthpiece ensures no foam or carbonation"
      ]
   },
   { id: 1200, name: "TRONO Premium Inflatable Chair", shortDescription: "",
      category: ["Smart Living", "Party Accessory","Camping Gear", "Beach Accessory", "Pool/Beach Accessory"],
      description: "Introducing the TRONO Premium Inflatable Chair, the comfiest and easiest way to relax anywhere. " +
      "The TRONO Chair is a super comfy, lightweight, easy to carry lounge chair which easily inflates within seconds. " +
      "It is designed for ultimate comfort, anytime and anywhere. It’s perfect for those sunny days at the beach, " +
      "in the park, or even while enjoying a picnic. If you are the outdoorsy and camping type, " +
      "this is the perfect chair for you. This lounge chair has been tested thoroughly under tough conditions " +
      "and it is more to withstand your adventurous lifestyle. In fact, it has a weight capacity of up to 330lbs. " +
      "Weighing only 1.7 lbs., you can take it anywhere. Lounging with absolute comfort has never been so easy. " +
      "The TRONO Chair comes in five different colors and includes an interchangeable suede cover.",
      price: 79, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/trono/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg"],
      feature: [ "Inflatable Chair is the comfiest and easiest way to relax anywhere",
         "Super comfy, lightweight, easy to carry lounge chair which easily inflates within seconds",
         "Perfect for those sunny days at the beach or in the park",
         "This lounge chair has been tested thoroughly under tough conditions",
         "Weight capacity of up to 330lbs, Weighing only 1.7 lbs",
         "Comes in five different colors and includes an interchangeable suede cover"
      ]
   },
   { id: 1210, name: "SolSource Sport Solar-Powered Stove", shortDescription: "",
      category: ["Beach Accessory", "Party Accessory", "Camping Gear", "Sports & Outdoor"],
      description: "Cook your food to perfection anywhere with the SolSource Sport Solar-Powered Stove. " +
      "Using the power of the sun, you can take the stove with you on the go. The secret to the SolSource Sport " +
      "is in the design. The multiple panels help to reflect and intensify the heat from the sun. " +
      "In the center of the SolSource Sport is a tray to hold your dish. " +
      "You can use pots, pans, ceramic, metal, or even a kettle. " +
      "The captured sun redirects the heat towards your dish to make cooking any dish a breeze. " +
      "In fact, you can use it in full sunlight, partial sunlight, or even in the cold. " +
      "As long as you can see your shadow, the SolSource Sport will work. " +
      "This stove is ideal for camping, beach barbeques, tailgating, boating, and everywhere in between. " +
      "It comes with a carrying bag and breaks down in just three minutes.",
      price: 149, inventory: 53, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/solsource/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg"],
      feature: [ "Cook your food to perfection anywhere using the power of the sun",
         "The multiple panels help to reflect and intensify the heat from the sun",
         "In the center of the SolSource Sport is a tray to hold your dish",
         "The captured sun redirects the heat towards your dish",
         "As long as you can see your shadow, the SolSource Sport will work",
         "Comes with a carrying bag and breaks down in just three minutes"
      ]
   },
   { id: 1220, name: "Braava Jet Robotic Mop by iRobot", shortDescription: "",
      category: ["Smart Home", "Smart Living", "Robots", "Home Accessory"],
      description: "Introducing the Braava Jet Robotic Mop by iRobot, the compact robot that will also " +
      "clean your floors for you. The small size allows this device to access every nook and cranny of your home. " +
      "Simply pour some water into the Braava Jet, attach a cleaning pad for your floor type, put it on the floor, and press play." +
      " The tiny robot will instantly get to work, trapping all of the dirty water on the pad to make sure your floors sparkle. " +
      "Most of all, the Braava Jet can also conquer 100 square feet in just an hour while the powerful " +
      "battery will last you an hour and a half. In addition, you’re even able to establish a virtual wall to keep " +
      "the Braava Jet Robotic Mop cleaning where you need it most.",
      price: 199, inventory: 81, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/braava/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"],
      feature: [ "Jet Robotic Mop by iRobot that clean your floors",
         "Small size allows this device to access every nook and cranny of your home",
         "Just add water and attach a cleaning pad and press play",
         "Trap all of the dirty water on the pad to make sure your floors sparkle",
         "Cleans 100 square feet in one hour",
         "Battery capacity - 1.5 hour", "Software can establish virtual walls for Braava to work within."
      ]
   },
   { id: 1230, name: "Momo Smart Home Security Robot", shortDescription: "",
      category: ["Robot", "Loss Prevention & Security", "Smart Living", "Smart Home", "Home Accessory"],
      description: "Bring your home into the 21st century with Momo, the elegant robotic home assistant. " +
      "This intelligent robot uses AI to be a central hub with security features. At its core, " +
      "Momo offers ultimate security. It has motion detection, facial recognition, and intelligent sound detection. " +
      "If anything out of the ordinary is detected, you get an instant notification. " +
      "In addition, Momo helps to round up your devices. As an all-in-one system, " +
      "Momo is also compatible with loads of smart home gadgets and devices. " +
      "These include Amazon Echo, Google Home, Nest, Philips, and more to really bring your home to life. " +
      "Finally, Momo is always learning. The AI module picks up on your preference and learns user habits " +
      "to make your house a home. Momo can even suggest automations to make your life easier. " +
      "With gesture control and voice activation, Momo completes your life at home.",
      price: 279, inventory: 5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/momo/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"],
      feature: [ "A robotic home assistant uses AI to be a central hub with security features",
         "Capable of motion detection, facial recognition, and intelligent sound detection with instant notification",
         "Momo is also compatible with Amazon Echo, Google Home, Nest, Philips..etc.",
         "Able to learn over time based on your preference and learns user habits",
         "Suggest automations to make your life easier with gesture control and voice activation"
      ]
   },
   { id: 1240, name: "Mopet Microfiber Robot Vacuum Mop", shortDescription: "",
      category: ["Robot", "Smart Living", "Smart Home", "Home Accessory"],
      description: "Sit back on the couch and allow the Mopet Microfiber Robot Vacuum Mop to keep the house tidy. " +
      "Working for 6 hours at a time, this friendly little helper sweeps away the dirt from every nook and cranny. " +
      "It vacuums up dust and pollen, leaving your floor squeaky clean. Because Mopet is just 8.75 inches wide, " +
      "it can get under beds and between bookcases. In addition, this adorable robot comes with face stickers, " +
      "and the microfiber brush on the underside is easy to clean. You can also put your favorite oil-based scents" +
      " on the brush to spread beautiful aromas throughout your home. Mopet runs on three AA batteries, " +
      "and the 10-minute “quick-clean” mode is great for freshening things up. Doing the chores has never been so relaxing.",
      price: 40.94, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/mopet/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg"],
      feature: [ "A robotic vacuum to keep the house tidy",
         "8.75 inches wide, use 3 AA batteries, works 6 hours at a time",
         "Place your favorite oil-based scents on the brush to spread aromas",
         "Equipped with 10-minute quick-clean mode"
      ]
   },
   { id: 1250, name: "BACtrack Skyn Wearable Alcohol Monitor", shortDescription: "",
      category: ["Loss Prevention & Security", "Smart Living", "Car Accessory", "Smart Phone & Accessory", "Wearable Tech"],
      description: "Stay safe and not sorry with the BACtrack Skyn Wearable Alcohol Monitor. " +
      "This sleek wearable works both on its on as well as with the Apple Watch. " +
      "The strap fits snugly around your wrist and is complete with a sensor on your skin. " +
      "As you imbibe, the BACtack Skyn gives you real-time information about your alcohol content. " +
      "Instead of measuring your BAC, this device measures your TAC (transdermal alcohol content). " +
      "It measures the excretions of alcohol that are produced through the skin. " +
      "The BACtrack Skyn and the app work in tandem to deliver notifications." +
      " If your BAC is increasing, you can get an alert to tell you to slow down. " +
      "Because this breakthrough technology is passively tracking, you don’t need to lug around a breathalyzer. " +
      "Finally, with this access to details, you can make better decisions. " +
      "Perfect for anyone who likes a beverage, the BACtrack Skyn will save countless lives.",
      price: 104.98, inventory: 320, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/skyn/",
      images: ["v1.jpeg", "v2.jpeg", "v3.jpeg", "v4.jpeg"],
      feature: [ "Helps you to monitor alchohol levels",
         "Compatible with the Apple Watch", "Fits snugly around your wrist",
         "Provides real-time information about your alcohol content, deliver notifications on your smart phone",
         "Measures your TAC (transdermal alcohol content) - excretions of alcohol that are produced through the skin",
         "Remove the need to lug around a breathalyzer", "Perfect for anyone who likes a beverage"
      ]
   },
   { id: 1260, name: "Levitating Indoor Plant Pot", shortDescription: "",
      category: ["Garden", "Home Accessory", "Smart Living"],
      description: "Give your home a magical makeover in the form of this Levitating Indoor Plant Pot. " +
      "This takes your indoor gardening skills and makes it look more glamorous. In addition, the magnetic design " +
      "makes sure the pot keeps floating in mid-air. It adds a sense of elegance and makes your indoor plant pot look " +
      "more visually pleasing. In fact, this pot is going to make a great conversation starter for your guests. " +
      "Just place it on the living room table and let them take it from there. " +
      "As a matter of fact, this plant pot gives your home a sci-fi enriched makeover. " +
      "And if you are into that kind of technologies, you are going to love having one of these in your room. " +
      "Just plant your favorite indoor seed and watch it grow in mid-air.",
      price: 95.09, inventory: 15, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
      image_url: "asset/image/product/levitee/",
      images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg"],
      feature: [ "magical makeover in the form of this Levitating Indoor Plant Pot",
         "Keeps floating in mid-air and more visually pleasing with sci-fi enriched makeover"
      ]
   },
];
