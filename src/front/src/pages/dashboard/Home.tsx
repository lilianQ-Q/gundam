import { faCalendarAlt, faPaperclip, faSitemap, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import '../../index.css';
import CallToAction from '../../components/buttons/CallToAction';
import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';
import Reports from '../../components/Reports';
import StatCard from '../../components/StatCard';
import { UserContext } from '../../context/UserContext';
import { Analytics as AnalyticsType } from '../../types/Analytics.type';
import UseInitialAnalyticsState from '../../hooks/UseInitialAnalyticsState';
import privateApi from '../../api/axiosapi';
import SiteList from './pages/component/SiteList';
import { toast } from 'react-hot-toast';

function Banner() {
	const user = useContext(UserContext);

	return (
		<div className='text-white flex flex-col gap-10 md:flex-row items-center border-b-2 border-[#2d2f30] py-10 justify-between'>
			<div className='flex gap-5 items-center'>
				<div className='w-16 h-16 bg-red-600 shrink-0 rounded-full bg-[url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABuVBMVEUAAAAAefu8AAsAu5D///8Is47FBQAAqIMWhf//tisAq4WsBQDDBQAAp4OtBQDNBQAIuJLOAAwAt43AAAsQgf6+AAAAsIj09PS5BQCyBQA3AQCmBQAAePwAvosAvI4pKSmrq6u+vr7IyMiTBACGBACcnJzX19f/vCzs7OwbGxtSUlKqqqpHAQAuAQBiAwB2AwBtAwB/AwAFcFn/vkYLwKgAm3gAZE0AfmIAOy5tbW0+Pj52dnZUVFSFhYUVAAA+AQAqAQBXAgBZAwAgAACQYmGAX1/YwsEzAAOlveEHW7wAN3YAJEsAEiUABg2dAAl+GDMAZNQCSJa6BicAGDNPO3YYEAA1KQWnDycAUq1eQArdniLSghGmFjoAYsz/rTV8Qo1mSA3udSlpTJ5WU7AHh18ItKwkFwDWShsNodYCKiIRju8BGRSjchfvfCebKFsNtMZQOQ6pHU3mpiGDXBCsQA0DTz7TPQ/BiB0LmOjmlh+2WRWyfhstMXMAgOYAaLgMubybOi99VUWdTz9mYk1DhGYAmLgAgcsAlMkAhuEAnbQAbP+hKCEAktOJUkFzYU3/mjKTsF6SvVnJrzqV9koUAAAIDElEQVR4nO2di18aVxaAGTKIDCA4MAM4iFqUIUYBNYhKkNp0100f1LTd7Mat2WR3bWti2zSttWnXzTt9JNtt9y/uuXcG5TXMmELmDj2fBl+T3+98Oeeec6+M0eVCEARBEARBEARhlfVqde5Vu4PoF/O5hbQ/LkkBaUSZzhcK+fzGxmu5ubGLdgfWI8bS0hAhEJAC9E0goH0sSSPp9LSSiPvT6fRCvpDL5xemF9LT8EJR0tOEdbsFzNgIhMAKXuMJcElodkRQexMiD1LC71f8lJH6CwAfDYVCC3YbmDCmJKSh7sQVxZ+I0wSHOjCUs9uhKwXFrygjkL3OmgGaPSjWGlyWhhotwPLcfHV+bL66OTZXrW4UCjnGV+tcXhmB4AkNuYQlKcXj8cQIqUtFed3uKH8jYwUlLsVH/C3AMlOmc9WxP/wxk7E7xF5wcXMTai5XyOfyuY1qdX7+Yr1FljODYdiFcmbS7hD6zMyg5xAEM2W7g+grlUE2XN/c3Fh3TWX+dOmNN9966227w+k5c7XIaCT0ztbwcDLJcVxy59LO5QHSXJ+bjowCoXc56kcUAW7r8nt2h9YbqrVRnXiUa4DIvmF3cD2gWovQBEYikVCNa+OS09O4kXZH3FTQ7YZ12G7IcZfftDvI38AY5M8NasSPGL7fydCxpfrnKxen3dTMrb+JSH/pbMj91e5gX4Sr23/z6351ItIHHf2g4+w4b3Dc9qnX4u4WpL93TmE0ym3ZHfBpue7z+W60CroD/+hsOAyKnLN6Kgheaxd0B/5pYAhEd/61bHfY1rnq8y3daKvRiDuw07T8kmQJkocoVdyV7Y7bMh9CiX7UnkG3Zqht26J09UWjxI4Iwjsfi8U9u0O3yKFP7VCixHCr3jw1LY0oqJJd6s0z4eAtu2O3xL6q3kh0Eoz4qV1ymBs+0TvOajJ63hMu2R28FfZ96ietZvqw+JR0FS7a7HcyFT8Le8Irdodvzm1ooy2TvlY3/FxvKpodnRGNih+HBU+RecUrPrW1y/jrezeypaFaSbL0ovXyPDa8GfYI4aDdBmZsq3f8HbsMMPRB8vgEfPJOvUbhdTfs8YSLdit05wvVd10xNPyUa67LVsV7YOgR2B4Zh6r6pZGge+j94S5+8PAZMQwf2C3RhQ/37/jUr4wER+OXDQ3rrQYMPSwPxUMVdjNtu7VjQ+WSieHX1DC8aLeHIVdBUL1rWKSjtR3jZUgNj6ihh91ecwcyeKdgbJg4Vkl2Nhw+Tw2ZXYlQo0vqfs3Y0E3PSVFC6yzUDKPnmU7ibRBcUr8xFHSPhraSHN1kJ1s2bHVDbldLIqO95ltieO1ky906FqUh6d9HT58eHR395+gIdqdaKpu5x3KZwn4UDO926KQSIa7cf1D0hsfHz4QBz/nd5z+SE1OLZN2QyW66rxLDT9r8ItKzhw8ePHpcFMQzJ6RSZ3afPP0+CTtUUq9a64F1yLLhNs1h68lXkp49ElMpUQAaDankeGr3O3oa1k8Z0EsZrtIrPmr4UYvfw8fUS5Rb9OqW4/LukyO9zSRPcsjiEepbtc1Q8j8odvRqkRR3v3v+/Y9Qryc5ZPG7bttNOYxIbin+k5AyF9Qkx8d/IIo3WV6HvgZDKfDs/sijkkU/3fLe82Tya02QzRxqhtfgYBHw//cx9JXT6GmJfMI9rxuy+A0p3TAQCfzklYXgqQWBcY8+DtnctqnU8G6g9ljweoPyCwiS+RHWDVlspprh/x4GZa+3afKJoijLULVeMCdTUZbhM4aSRE8QWByIt6mh72fQaMifKHiDQS/k1EsBTZ2gYJDl5bf3lkulIoM5vE4NfxGDx6NdlAVdS8MrFOsQ06C3o6TeRNkTdB0ugeD/x2W5rqelKugNLpZKi8vLB3vkQHTr1t4evA9J0tIpt9crg24a20uq77Dk1QOmfuBQLBkFvLIY9Go5bs5kisVJSPli6fCKq6jvQQW69kor3c+xK4tFUrxwbUO9smvo2oc/JWIo0piDlpohlaSZFJmvUsoBFSTNxfpTnQdFWab/JpqjyPY9GQcpbQUWTzXNVkqCKNTTyOJmpoEVUSbZOPXB4NYy7UzsF6lrTyAN8oW2I1CsUKcpFk9NTRQFr+F8MGOlFBTZbaR1Vqy1UMO/3qs4+gjbT/0hCPK7ZTUTy0zYHcSLMVFetRD5DA9k+x9NH6ChZ9ZMrprlKasvJaTeMhGjoc+YXLZGr3rlpYTUY1Zp6NmzZtedy8ZiTswgMAl+Dg3dMmZrEEEQBEEQBEEQBEEQBEEQBEEQBEEQBEGYZm1milA2vYHBmcxOkjtQYjF4jJndheJAzpaneD4zuToBzM5k+OwFuyPqMReyPD/ZIHXO/GYiR3E2w/PnmtfeRJafsimaPlDO8pNtN9dMTPGTNsTSFyp8rNLp8zP8gPzf5WWen+38lYzRF5zFRDZm1DYv8Odeaih9gueN72/LxBx6d3AjlW79ZHYQmk2s6x3OU868/7mRSvcbnCtdStghTPFdvzzr+F5z1myhZTMOP2aYFKnL9YrTyzTLm4yDisP3NWu82S8GWnP4vLAw72LO/uVIF8wPgVlnG06ab60zZiuVbUymIaHibMNYzPQShxta2LGgIdusDbxh2cKWzMJAYZiyeSuFbuRkw8rAG05Z2a8429DKz/f+Dgwd+WPOOpYMK05++sKSoaPJDLzhID1/hiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiDIQPErZPcOAxpEok4AAAAASUVORK5CYII=")] bg-cover bg-right'></div>
				<div className='flex flex-col gap-2'>
					<span>Salut {user.displayName} 🤟🏻</span>
					<div className='text-[#868d96]'>J'espère que tout va bien et que tu passes une bonne journée.</div>
				</div>
			</div>
			<div className='flex flex-col gap-2 md:flex-row shrink-0'>
				<CallToAction href='/dashboard/site/add' label='Nouveau Site'/>
				<CallToAction href='/dashboard/report/new' label='Nouveau rapport' color='bg-emerald-300'/>
			</div>
		</div>
	);
}

function Analytics() {

	const [stats, SetStats] = useState<AnalyticsType>(UseInitialAnalyticsState());

	useEffect(() => {
		privateApi.get<number>('/site/count')
			.then((response) => {
				SetStats((previous) => ({...previous, site: response.data}));
			});

		privateApi.get<number>('/report/count')
			.then((response) => {
				SetStats((previous) => ({...previous, reports: response.data}));
			})

		privateApi.get<number>('/report/countfailed')
			.then((response) => {
				SetStats((previous) => ({...previous, errors: response.data}));
			})

		privateApi.get<number>('/report/countfailedpercentage')
			.then((response) => {
				SetStats((previous) => ({...previous, errorPercentage: response.data}));
			})
		
		privateApi.get<number>('/report/countreportpercentage')
			.then((response) => {
				SetStats((previous) => ({...previous, reportPercentage: response.data}));
			})
	}, []);

	return (
		<div className='text-white py-10 flex flex-col gap-10'>
			<div className='flex justify-between'>
				<h2 className='font-normal text-2xl tracking-wide flex gap-2 items-center'>Status <span className='w-14 h-[2px] bg-white mt-1 bg-[#838992]'></span></h2>
				<div className='flex gap-2 items-center border-[1px] border-[#2a2b30] p-2 px-5 text-sm font-light text-[#d6d7d9]'>
					<FontAwesomeIcon 
						icon={faCalendarAlt}
						color='#d6d7d9'
					/>
					<span>This Month</span>
				</div>
			</div>
			<div className='flex justify-around flex-col md:flex-row gap-5 flex-wrap items-center'>
				<StatCard
					color='bg-blue-200'
					label='Total sites'
					percentage={stats.sitePercentage}
					value={stats.site.toString()}
					icon={faSitemap}
				/>
				<StatCard
					color='bg-orange-200'
					label='Total errors'
					percentage={stats.errorPercentage}
					value={stats.errors.toString()}
					icon={faXmarkCircle}
				/>
				<StatCard
					color='bg-purple-300'
					label='Total reports'
					percentage={stats.reportPercentage}
					value={stats.reports.toString()}
					icon={faPaperclip}
				/>
			</div>
		</div>
	);
}

function DashboardHomeComponent() {
	return (
		<div className='flex flex-col'>
			<Navbar />
			<section className='flex flex-col p-10 px-20 bg-[#161819]'>
				<Banner />
				<Analytics />
			</section>
			<section className='flex flex-col p-10 px-20 bg-white'>
				<Reports />
			</section>
			<section className='flex flex-col p-10 px-20 bg-white'>
				<SiteList />
			</section>
			<section>
				<Footer />
			</section>
		</div>	
	);
}

function DashboardHome()
{
	return <DashboardHomeComponent />;
}

export default DashboardHome;