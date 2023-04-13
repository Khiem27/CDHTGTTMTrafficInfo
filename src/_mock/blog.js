import { faker } from '@faker-js/faker/locale/vi';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Whiteboard Templates By Industry Leaders',
  'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
  'Designify Agency Landing Page Design',
  '✨What is Done is Done ✨',
  'Fresh Prince',
  'Six Socks Studio',
  'vincenzo de cotiis’ crossing over showcases a research on contamination',
  'Simple, Great Looking Animations in Your Project | Video Tutorial',
  '40 Free Serif Fonts for Digital Designers',
  'Examining the Evolution of the Typical Web Design Client',
  'Katie Griffin loves making that homey art',
  'The American Dream retold through mid-century railroad graphics',
  'Illustration System Design',
  'CarZio-Delivery Driver App SignIn/SignUp',
  'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
  'Tylko Organise effortlessly -3D & Motion Design',
  'RAYO ?? A expanded visual arts festival identity',
  'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
  'Inside the Mind of Samuel Day',
  'Portfolio Review: Is This Portfolio Too Creative?',
  'Akkers van Margraten',
  'Gradient Ticket icon',
  'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
  'How to Animate a SVG with border-image',
];

const posts = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
  address: faker.address.streetAddress(),
}));

export const ADDRESS = [
  {
    id: 0,
    address: 'S1',
    district: 'Tân Phú',
    city: 'Hồ Chí Minh',
    country: 'Việt Nam',
    lat: 10.795,
    lng: 106.65,
    author: {
      name: faker.name.fullName(),
      avatarUrl: `/assets/images/avatars/avatar_${0 + 1}.jpg`,
    },
  },
  {
    id: 1,
    address: '101 Lê Hữu Trác',
    district: 'Sơn Trà',
    city: 'Đà Nẵng',
    country: 'Việt Nam',
    lat: 16.0648,
    lng: 108.2344,
    author: {
      name: faker.name.fullName(),
      avatarUrl: `/assets/images/avatars/avatar_${1 + 1}.jpg`,
    },
  },
  {
    id: 2,
    address: '123 Phan Đăng Lưu',
    district: 'Hải Châu',
    city: 'Đà Nẵng',
    country: 'Việt Nam',
    lat: 16.0673,
    lng: 108.2121,
    author: {
      name: faker.name.fullName(),
      avatarUrl: `/assets/images/avatars/avatar_${2 + 1}.jpg`,
    },
  },
  {
    id: 3,
    address: '15 Nguyễn Chánh',
    district: 'Cầu Giấy',
    city: 'Hà Nội',
    country: 'Việt Nam',
    lat: 21.0327,
    lng: 105.7939,
    author: {
      name: faker.name.fullName(),
      avatarUrl: `/assets/images/avatars/avatar_${3 + 1}.jpg`,
    },
  },
  {
    id: 4,
    address: '35 Lý Thái Tổ',
    district: 'Hoàn Kiếm',
    city: 'Hà Nội',
    country: 'Việt Nam',
    lat: 21.0279,
    lng: 105.8524,
    author: {
      name: faker.name.fullName(),
      avatarUrl: `/assets/images/avatars/avatar_${4 + 1}.jpg`,
    },
  },
];
export default posts;
