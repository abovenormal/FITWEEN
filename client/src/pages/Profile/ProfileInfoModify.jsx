import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userApi from '../../api/user';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import TopNavigation from '../../components/Common/TopNavigation/TopNavigation';
import {
	validateFootSize,
	validateHeight,
	validateNickName,
	validateWeight,
	validateAllInput,
	validateDateOfBirth,
} from '../../utils/validate';
import nicknameImg from '../../assets/nickname.svg';
import { Radiobox } from '../../components/Common/CheckBox/Checkbox';

const ProfileInfoModify = () => {
	const [readyState, setReadyState] = useState(false);
	const [nickNameErrMsg, setNickNameErrMsg] = useState('');
	const [validateNickname, setValidateNickname] = useState(true);
	const mounted = useRef(false);
	const navigate = useNavigate();
	const [info, setInfo] = useState({
		gender: '',
		dateOfBirth: '',
		nickname: '',
		weight: '',
		height: '',
		footSize: '',
		region: '',
	});

	const onChangeHandler = e => {
		setInfo(prevState => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};

	useEffect(() => {
		const getInfo = async () => {
			try {
				const res = await userApi.getuserDetailInfo();
				setInfo(res);
			} catch (err) {
				throw err;
			}
		};
		getInfo();
	}, []);

	useEffect(() => {
		if (mounted.current) {
			const checkAll = async info => {
				const { state, errMessage } = await validateNickName(info.nickname);

				setValidateNickname(state);

				if (!state) {
					setNickNameErrMsg(errMessage);
				} else {
					setNickNameErrMsg('');
				}

				if (await validateAllInput(info)) {
					setReadyState(true);
				} else {
					setReadyState(false);
				}
			};
			checkAll(info);
		} else {
			mounted.current = true;
		}
	}, [info]);

	return (
		<>
			<TopNavigation
				backClick
				onBackClick={() => {
					navigate(-1);
				}}
			/>
			<div
				className="wrapper"
				style={{
					padding: '30px',
					width: '100%',
					height: '100%',
					position: 'relative',
				}}
			>
				<h2 className="fs-24 fw-700" style={{ textAlign: 'center', paddingBottom: 30 }}>
					?????? ?????? ??????
				</h2>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						paddingBottom: '30px',
					}}
				>
					<Radiobox
						id="woman"
						type="radio"
						onClick={onChangeHandler}
						value="??????"
						name="gender"
						checked={info.gender === '??????'}
					/>
					??????
					<Radiobox
						id="man"
						type="radio"
						onClick={onChangeHandler}
						value="??????"
						name="gender"
						style={{ marginLeft: '20px' }}
						checked={info.gender === '??????'}
					/>
					??????
				</div>
				<Input
					placeholder="????????????"
					error={!(info.dateOfBirth.length === 0 || validateDateOfBirth(info.dateOfBirth))}
					errMsg="??????????????? ??????????????????."
					type="date"
					value={info.dateOfBirth}
					onChange={onChangeHandler}
					name="dateOfBirth"
					style={{
						padding: '20px',
						fontSize: '14px',
					}}
				/>
				<Input
					placeholder="??????"
					error={!(info.nickname.length === 0 || validateNickname)}
					errMsg={nickNameErrMsg}
					image={nicknameImg}
					type="text"
					onChange={onChangeHandler}
					value={info.nickname}
					name="nickname"
					style={{
						padding: '20px',
						fontSize: '14px',
					}}
				/>
				<Input
					placeholder="???"
					error={!(info.height === null || validateHeight(info.height))}
					errMsg="?????? 90cm ?????? 250cm ????????? ??????????????????."
					unit="cm"
					type="number"
					value={info.height}
					name="height"
					onChange={onChangeHandler}
					style={{
						padding: '20px',
						fontSize: '14px',
					}}
				/>
				<Input
					placeholder="?????????"
					error={!(info.weight === null || validateWeight(info.weight))}
					errMsg="???????????? 30kg ?????? 200kg ????????? ??????????????????."
					unit="kg"
					type="number"
					value={info.weight}
					name="weight"
					onChange={onChangeHandler}
					style={{
						padding: '20px',
						fontSize: '14px',
					}}
				/>
				<Input
					placeholder="????????????"
					error={!(info.footSize === null || validateFootSize(info.footSize))}
					errMsg="??????????????? 0mm ?????? 350mm ????????? ??????????????????."
					unit="mm"
					type="number"
					value={info.footSize}
					name="footSize"
					onChange={onChangeHandler}
					style={{
						padding: '20px',
						fontSize: '14px',
					}}
				/>
				<Button
					style={{
						position: 'absolute',
						bottom: 0,
						width: 'calc(100% - 60px)',
						marginBottom: 50,
					}}
					type={readyState ? 'active' : 'disabled'}
					label="?????? ?????????"
					onClick={() => navigate('/profile/modify/town', { state: info })}
				/>
			</div>
		</>
	);
};

export default ProfileInfoModify;
