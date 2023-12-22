import { useSession } from 'next-auth/react';
import LoginUser from '@/components/Login';
import ProfileContent from '@/components/ProfileContent';
import { useDateContext } from '@/context/dateContext';

const Profile = () => {
	const { data: session, status } = useSession();

	if (session) {
		return <ProfileContent />;
	}

	return <LoginUser title={'My Profile'} />;
};

export default Profile;
