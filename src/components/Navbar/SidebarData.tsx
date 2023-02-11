import {AiFillCaretDown, AiFillCaretUp, AiOutlineHome} from 'react-icons/ai';
import {RiCalendarEventFill} from 'react-icons/ri';
import {SidebarItem} from '../../models/SidebarItem';

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
		],
	},

	{
		title: 'Quản lý lịch họp',
		path: '/calendar',
		icon: <RiCalendarEventFill />,
	},
];
