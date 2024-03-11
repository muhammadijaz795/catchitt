import React from 'react';
import style from './Follow.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function FollowBtn(props: any) {
    const { width = '100%', height = '32px' } = props || {};
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/auth')} style={{ width, height }} className={style.parent}>
            Follow
        </div>
    );
}

export default FollowBtn;
