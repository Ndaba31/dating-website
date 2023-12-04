import React from 'react';

const HickyAvatar = ({ hicky }) => {
	const { profile_photo, nick_name, stem } = hicky;
	return <div>{stem}</div>;
};

export default HickyAvatar;
