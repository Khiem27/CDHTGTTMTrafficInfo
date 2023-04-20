// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Trang chủ',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Đoạn đường nguy hiểm',
    path: '/dashboard/all-blog',
    icon: icon('ic_user'),
  },

  {
    title: 'Đóng góp',
    path: '/dashboard/contributions',
    icon: icon('ic_blog'),
  },

  {
    title: 'Dẫn đường',
    path: '/dashboard/navigation',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
