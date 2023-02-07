import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineHistory,
  AiOutlineHome,
  AiOutlineMoneyCollect,
  AiOutlineUser,
} from 'react-icons/ai';
import { HiDocumentRemove, HiOutlineDocumentAdd } from 'react-icons/hi';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import { SidebarItem } from '../../models/SidebarItem';

export const SidebarData: SidebarItem[] = [
  {
    title: 'Quản lý hộ gia đình',
    path: '',
    icon: <AiOutlineHome />,
    iconClosed: <AiFillCaretDown />,
    iconOpened: <AiFillCaretUp />,
    subnav: [
      {
        title: 'Danh sách hộ gia đình',
        path: '/family',
        icon: <AiOutlineHome />,
      },
      {
        title: 'Đăng ký tạm trú',
        path: '/tamtru',
        icon: <HiOutlineDocumentAdd />,
      },
      {
        title: 'Đăng ký tạm vắng',
        path: '/tamvang',
        icon: <HiDocumentRemove />,
      },
    ],
  },
  {
    title: 'Quản lý nhân khẩu',
    path: '/people',
    icon: <AiOutlineUser />,
  },
  {
    title: 'Quản lý quỹ',
    path: '/funding',
    icon: <RiMoneyDollarBoxFill />,
  },
];
