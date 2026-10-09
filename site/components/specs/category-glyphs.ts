// 카테고리 아이콘 세트(specs/components/category-icons.yaml)를 그리는 lucide 이름표 — 저장 값(lucide 이름) → 아이콘.
// 고를 수 있는 아이콘 · 묶음 · 이름 · 찾는 말은 YAML 이 원본이다(input-look 의 categoryIconSet). 여기는 그리는 길만 둔다 —
// YAML 에 아이콘을 더하면 이 표에도 더해야 빌드가 지나간다(input-look 이 빠진 것을 멈춘다).
// 세트 밖 그림(옛 저장 값 a-arrow-down — 지금 제품의 lucide 전체 첫 칸)도 여기서 그린다.
import {
  AArrowDown, AArrowUp, ALargeSmall, Accessibility, AirVent, Airplay, AlarmClock, AlarmClockCheck, AlarmClockMinus, AlarmClockOff, AlarmClockPlus, AlarmSmoke,
  AlignCenterHorizontal, Activity, Apple, ArrowLeftRight, Baby, Backpack, Banknote, Bean, Bed, Beef, Beer, Bike, Book, BookOpen, Bookmark, Box, Briefcase,
  Building, Bus, Cake, CakeSlice, Calculator, Camera, Candy, Car, CarTaxiFront, Carrot, Cat, ChartLine, ChefHat, Church, CircleParking, Clapperboard,
  Coffee, Coins, Cookie, CreditCard, Croissant, CupSoda, Dice5, Dog, Drama, Droplet, Drumstick, Dumbbell, EggFried, Ellipsis, Eye, Film, Fish, Flame,
  Flower, Folder, Fuel, Gamepad2, Gem, Gift, GlassWater, Glasses, Globe, GraduationCap, Guitar, Hamburger, HandCoins, HandHeart, Headphones, Heart,
  HeartHandshake, HeartPulse, Home, Hospital, Hotel, House, IceCreamCone, KeyRound, Lamp, Landmark, Languages, Laptop, Library, Luggage, Mail,
  MailOpen, Map, MapPin, Martini, Milk, Mountain, Music, NotebookPen, Package, PaintRoller, Palette, PartyPopper, PawPrint, Pencil, Percent,
  PiggyBank, Pill, Pizza, Plane, Popcorn, Puzzle, Receipt, Repeat, Route, Salad, Sandwich, School, Scissors, ShieldCheck, Ship, Shirt, ShoppingBag,
  ShoppingBasket, ShoppingCart, Smartphone, Smile, Sofa, Soup, Sparkles, SprayCan, Sprout, Star, Stethoscope, Store, Syringe, Tag, Tent, Ticket,
  TrainFront, TramFront, Trash2, TreePalm, TrendingUp, Trophy, Tv, Umbrella, Users, Utensils, UtensilsCrossed, Wallet, WashingMachine, Watch, Waves,
  WavesHorizontal, Wheat, Wifi, Wine, Wrench, Zap,
  type LucideIcon,
} from 'lucide-react';

export const CATEGORY_GLYPHS: Record<string, LucideIcon> = {
  utensils: Utensils, 'utensils-crossed': UtensilsCrossed, 'chef-hat': ChefHat, soup: Soup, salad: Salad, sandwich: Sandwich, pizza: Pizza,
  hamburger: Hamburger, drumstick: Drumstick, beef: Beef, fish: Fish, 'egg-fried': EggFried, croissant: Croissant, 'cake-slice': CakeSlice,
  'ice-cream-cone': IceCreamCone, cookie: Cookie, candy: Candy, apple: Apple, carrot: Carrot, popcorn: Popcorn, milk: Milk, wheat: Wheat,
  'shopping-basket': ShoppingBasket, coffee: Coffee, 'cup-soda': CupSoda, 'glass-water': GlassWater, beer: Beer, wine: Wine, martini: Martini,
  bean: Bean, bus: Bus, 'train-front': TrainFront, 'tram-front': TramFront, car: Car, 'car-taxi-front': CarTaxiFront, fuel: Fuel,
  'circle-parking': CircleParking, plane: Plane, ship: Ship, bike: Bike, ticket: Ticket, route: Route, house: House, home: Home, building: Building,
  'key-round': KeyRound, zap: Zap, droplet: Droplet, flame: Flame, wifi: Wifi, smartphone: Smartphone, tv: Tv, sofa: Sofa, bed: Bed, lamp: Lamp,
  wrench: Wrench, 'paint-roller': PaintRoller, 'shopping-cart': ShoppingCart, 'spray-can': SprayCan, 'washing-machine': WashingMachine,
  scissors: Scissors, sparkles: Sparkles, 'trash-2': Trash2, package: Package, mail: Mail, umbrella: Umbrella, baby: Baby, dog: Dog, cat: Cat,
  'paw-print': PawPrint, flower: Flower, sprout: Sprout, 'shopping-bag': ShoppingBag, shirt: Shirt, glasses: Glasses, watch: Watch, gem: Gem,
  gift: Gift, store: Store, laptop: Laptop, headphones: Headphones, camera: Camera, book: Book, backpack: Backpack, 'heart-pulse': HeartPulse,
  hospital: Hospital, pill: Pill, stethoscope: Stethoscope, syringe: Syringe, dumbbell: Dumbbell, activity: Activity, heart: Heart, smile: Smile,
  eye: Eye, wallet: Wallet, banknote: Banknote, coins: Coins, 'piggy-bank': PiggyBank, 'credit-card': CreditCard, landmark: Landmark,
  receipt: Receipt, percent: Percent, 'trending-up': TrendingUp, 'chart-line': ChartLine, 'hand-coins': HandCoins, 'shield-check': ShieldCheck,
  calculator: Calculator, briefcase: Briefcase, 'arrow-left-right': ArrowLeftRight, repeat: Repeat, film: Film, clapperboard: Clapperboard,
  music: Music, 'gamepad-2': Gamepad2, drama: Drama, palette: Palette, 'book-open': BookOpen, tent: Tent, mountain: Mountain,
  'waves-horizontal': WavesHorizontal, waves: Waves, trophy: Trophy, guitar: Guitar, 'party-popper': PartyPopper, 'dice-5': Dice5, puzzle: Puzzle,
  luggage: Luggage, hotel: Hotel, map: Map, 'map-pin': MapPin, globe: Globe, 'tree-palm': TreePalm, 'graduation-cap': GraduationCap, school: School,
  pencil: Pencil, 'notebook-pen': NotebookPen, library: Library, languages: Languages, cake: Cake, 'heart-handshake': HeartHandshake,
  'hand-heart': HandHeart, users: Users, church: Church, 'mail-open': MailOpen, tag: Tag, star: Star, bookmark: Bookmark, box: Box, folder: Folder,
  ellipsis: Ellipsis,
};

// 세트 밖 — lucide 전체의 첫 화면(지금 제품이 여는 차례, 나쁜 예 그림)과 옛 저장 값. 고르는 격자에는 없다
export const LUCIDE_FIRST = ['a-arrow-down', 'a-arrow-up', 'a-large-small', 'accessibility', 'activity', 'air-vent', 'airplay', 'alarm-clock', 'alarm-clock-check', 'alarm-clock-minus', 'alarm-clock-off', 'alarm-clock-plus', 'alarm-smoke', 'align-center-horizontal'];
Object.assign(CATEGORY_GLYPHS, {
  'a-arrow-down': AArrowDown, 'a-arrow-up': AArrowUp, 'a-large-small': ALargeSmall, accessibility: Accessibility, 'air-vent': AirVent, airplay: Airplay,
  'alarm-clock': AlarmClock, 'alarm-clock-check': AlarmClockCheck, 'alarm-clock-minus': AlarmClockMinus, 'alarm-clock-off': AlarmClockOff,
  'alarm-clock-plus': AlarmClockPlus, 'alarm-smoke': AlarmSmoke, 'align-center-horizontal': AlignCenterHorizontal,
} satisfies Record<string, LucideIcon>);
