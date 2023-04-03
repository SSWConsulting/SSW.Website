import axios from "axios";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import { FC, useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { Tooltip } from "react-tooltip";
import layoutData from "../../content/global/index.json";
import { LiveStreamWidgetInfo, SpeakerInfo } from "../../services";
import ReactPlayer from "../reactPlayer/reactPlayer";
import { SocialIcons, SocialTypes } from "../util/socialIcons";
import { LiveStreamProps } from "./useLiveStreamProps";

export const LiveStream: FC<LiveStreamProps> = ({ isLive, event }) => {
	const eventDescriptionCollapseId = "eventDescription";

	const [widgetInfo, setWidgetInfo] = useState<LiveStreamWidgetInfo>();
	const [speakersInfo, setSpeakersInfo] = useState<SpeakerInfo[]>([]);
	const [youtubeUrls, setYoutubeUrls] = useState<{
		videoUrl?: string;
		chatUrl?: string;
		liveStreamUrl?: string;
	}>({});
	const [collapseMap, setCollapseMap] = useState<{ [key: string]: boolean }>({
		[eventDescriptionCollapseId]: true,
	});
	const [eventDescriptionCollapsable, setEventDescriptionCollapsable] =
		useState<boolean>();

	const router = useRouter();

	const collapsableWidgetRefCallback = (e: HTMLDivElement) => {
		!!e &&
			!!e.clientHeight &&
			(e.style.maxHeight = `${document.body.offsetHeight}px`);
	};

	const collapsableEventDescriptionRefCallback = (e: HTMLDivElement) => {
		if (e) {
			const collapsable = e.scrollHeight > e.clientHeight;

			if (eventDescriptionCollapsable == undefined) {
				setEventDescriptionCollapsable(collapsable);
			}
		}
	};

	useEffect(() => {
		const fetchLiveStreamInfo = async () => {
			if (!isLive && !router.query.liveStream) {
				return;
			}

			const widgetInfoRes = await axios.get<LiveStreamWidgetInfo>(
				"/api/get-livestream-widget",
				{
					params: { eventId: event.Id },
				}
			);

			if (widgetInfoRes.status === 200 && widgetInfoRes.data) {
				setWidgetInfo(widgetInfoRes.data);

				setYoutubeUrls({
					videoUrl: `https://www.youtube.com/embed/${widgetInfoRes.data.YouTubeId}?rel=0&autoplay=1`,
					chatUrl: `https://www.youtube.com/live_chat?v=${widgetInfoRes.data.YouTubeId}&embed_domain=${window.location.hostname}`,
					liveStreamUrl: `https://www.youtube.com/watch?v=${widgetInfoRes.data.YouTubeId}`,
				});

				const ids: string[] = [];
				const emails: string[] = [];

				if (widgetInfoRes.data.ExternalPresentersId?.results?.length) {
					ids.push(...widgetInfoRes.data.ExternalPresentersId.results);
				}

				if (widgetInfoRes.data.InternalPresenters?.results?.length) {
					emails.push(
						...widgetInfoRes.data.InternalPresenters.results.map((i) => i.EMail)
					);
				}

				const speakersInfo: SpeakerInfo[] = [];

				if (ids.length || emails.length) {
					const idsParam = ids.map((id) => `ids=${id}`).join("&");
					const emailsParam = emails
						.map((email) => `emails=${email}`)
						.join("&");

					const remoteSpeakersInfoRes = await axios.get<SpeakerInfo[]>(
						`/api/get-speakers?${idsParam}&${emailsParam}`
					);

					if (
						remoteSpeakersInfoRes.status === 200 &&
						remoteSpeakersInfoRes.data.length
					) {
						speakersInfo.push(...remoteSpeakersInfoRes.data);
					}
				} else {
					speakersInfo.push({
						Title: widgetInfoRes.data.Presenter,
						PresenterProfileLink: widgetInfoRes.data.PresenterProfileUrl.Url,
					});
				}
				setSpeakersInfo(speakersInfo);
			}
		};

		fetchLiveStreamInfo();
	}, [isLive, event]);

	if (!widgetInfo) {
		return <></>;
	}

	return (
		<>
			<Script src="https://apis.google.com/js/platform.js" />
			<div className="grid grid-cols-4">
				<div className="col-span-2 sm:col-span-1">
					<Image
						src="/images/logos/SSW_NUG_Live.png"
						width="239"
						height="95"
						alt="NETUG LIVE"
						className="object-contain"
					/>
				</div>
				<div className="col-span-2 flex items-center justify-end sm:col-span-3">
					<span className="hidden pr-2 sm:inline">Subscribe to SSW TV</span>
					<div
						className="g-ytsubscribe"
						data-channelid={widgetInfo.ChannelId}
						data-layout="default"
						data-count="default"
					></div>
				</div>
			</div>

			<a
				className="relative flex cursor-pointer items-center justify-center bg-white"
				onClick={() =>
					setCollapseMap({
						collapsableWidget: !collapseMap["collapsableWidget"],
					})
				}
			>
				<hr className="my-6 w-full" />
				<div className="absolute w-min bg-inherit px-1">
					{collapseMap["collapsableWidget"] ? <TfiAngleUp /> : <TfiAngleDown />}
				</div>
			</a>

			<div
				id="collapsableWidget"
				ref={collapsableWidgetRefCallback}
				className={classNames(
					{
						"!max-h-0": collapseMap["collapsableWidget"],
					},
					"overflow-hidden transition-all"
				)}
			>
				<div className="mb-4 grid grid-cols-3 gap-8">
					<div id="thumbnailAnchor" className="col-span-3 md:col-span-2">
						<div className="relative h-0 pt-9/16">
							<div className="absolute top-0 h-full w-full">
								<ReactPlayer
									url={youtubeUrls.videoUrl}
									width="100%"
									height="100%"
									controls={true}
								/>
							</div>
						</div>
					</div>
					{/* custom fixed width and height to have best looking and fixed size for different screens */}
					<div
						className={"fixed right-0 top-2 aspect-video h-56 z-videoThumbnail"}
						data-aos="slide-left"
						data-aos-duration={500}
						data-aos-anchor="#thumbnailAnchor"
						data-aos-anchor-placement="bottom-top"
					>
						<ReactPlayer
							url={youtubeUrls.videoUrl}
							width="100%"
							height="100%"
							controls={true}
						/>
					</div>
					<div className="hidden h-full sm:col-span-3 sm:block md:col-span-1">
						<iframe width="100%" height="100%" src={youtubeUrls.chatUrl} />
					</div>
					<div className="col-span-3 block sm:hidden">
						<a
							href={youtubeUrls.liveStreamUrl}
							className="flex h-12 items-center justify-center bg-sswRed text-white"
							target="_blank"
							rel="noopener noreferrer"
						>
							Chat with us on Youtube
						</a>
					</div>
				</div>

				<div className="mb-4 grid grid-cols-1 gap-x-8 md:grid-cols-2">
					<div className="text-center md:text-start">
						<p>Download the SSW Rewards app</p>
						<a
							className="mr-2 inline-block"
							href={layoutData.apps.sswRewards.link.appStore}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								id="appStoreBadge"
								src="/images/badges/App_Store_Badge_US.svg"
								alt="Download on the App Store"
								width="120"
								height="40"
							/>
							<Tooltip
								anchorSelect="#appStoreBadge"
								place="bottom"
								className="p-1 z-tooltip"
							>
								<Image
									src="/images/badges/QRcode_App_Store.svg"
									width="100"
									height="100"
									alt="SSW Reward App QR Code"
								/>
							</Tooltip>
						</a>
						<a
							className="inline-block"
							href={layoutData.apps.sswRewards.link.googlePlay}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								id="googlePlayBadge"
								src="/images/badges/Google_Play_Store_badge_EN.svg"
								alt="Get it on Google Play"
								width="135"
								height="40"
							/>
							<Tooltip
								anchorSelect="#googlePlayBadge"
								place="bottom"
								className="p-1 z-tooltip"
							>
								<Image
									src="/images/badges/QRcode_Google_Play.svg"
									width="100"
									height="100"
									alt="SSW Reward App QR Code"
								/>
							</Tooltip>
						</a>
					</div>
					<div className="text-center md:text-start">
						<p>How did we do?</p>
						<div className="flex">
							{/* TODO: Update link after the page is implemented */}
							<a
								href="https://www.ssw.com.au/ssw/NETUG/EvaluationSurvey.aspx"
								target="_blank"
								className="mr-2 flex h-11 w-full items-center justify-center rounded-md bg-sswRed text-white !no-underline hover:!text-gray-125 md:w-72"
							>
								Take the Survey
							</a>
							<div className="pt-3">
								<Image
									src="/images/icons/external.gif"
									alt="You are now leaving SSW"
									width="15"
									height="11"
									data-tooltip-id="external"
									data-tooltip-content="You are now leaving SSW"
									data-tooltip-place="bottom"
								/>
								<Tooltip id="external" className="z-tooltip" />
							</div>
						</div>
					</div>
				</div>

				<div className="mb-4 grid grid-cols-1 gap-x-8 md:grid-cols-2">
					<div className="bg-gray-75 px-4 py-2">
						<div>
							<h3 className="mb-3 text-xl font-bold">About the Talk</h3>
							<div
								id={eventDescriptionCollapseId}
								ref={collapsableEventDescriptionRefCallback}
								className={classNames(
									"prose",
									{ "max-h-70": collapseMap[eventDescriptionCollapseId] },
									{ "max-h-screen": !collapseMap[eventDescriptionCollapseId] },
									{
										"overflow-hidden": collapseMap[eventDescriptionCollapseId],
									}
								)}
								dangerouslySetInnerHTML={{
									__html:
										widgetInfo.EventDescription ||
										widgetInfo.EventShortDescription,
								}}
							></div>
							{eventDescriptionCollapsable && (
								<div
									className={classNames({
										"relative -mt-15 w-full bg-gradient-to-b from-transparent to-gray-75 pt-15":
											collapseMap[eventDescriptionCollapseId],
									})}
								>
									<a
										className="float-right mt-4 cursor-pointer border-b-1 border-dotted border-gray-450 !no-underline"
										onClick={() =>
											setCollapseMap({
												[eventDescriptionCollapseId]:
													!collapseMap[eventDescriptionCollapseId],
											})
										}
									>
										{collapseMap[eventDescriptionCollapseId]
											? "More >"
											: "< Less"}
									</a>
								</div>
							)}
						</div>

						<div className="mt-17">
							<h4 className="font-bold">Follow us on:</h4>
							<SocialIcons
								excludeDesktop={[SocialTypes.phone]}
								excludeMobile={[SocialTypes.phone]}
							/>
						</div>

						<div className="mt-17">
							<h3 className="mb-3 font-bold">
								Get notified about news & future events
							</h3>
							<div className="grid grid-cols-3 gap-8">
								<input
									className="col-span-3 appearance-none rounded border-1 border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:shadow focus:outline md:col-span-2"
									id="email"
									type="email"
									placeholder="Your Email"
								/>
								{/* TODO: Implement subscribe function */}
								<a
									href="#"
									className="col-span-3 flex h-11 items-center justify-center rounded-md bg-sswRed align-middle leading-4 text-white !no-underline hover:!text-gray-125 md:col-span-1"
								>
									<FaEnvelope className="mr-2" />
									Subscribe
								</a>
							</div>
						</div>
					</div>

					<div className="bg-gray-75 px-4 py-2">
						<h3 className="mb-3 text-xl font-bold">About the Speaker</h3>
						{!!speakersInfo.length &&
							speakersInfo.map((speakerInfo, index) => (
								<div key={index} className="mb-8 grid grid-cols-6 gap-x-8">
									<div className="col-span-1">
										{!!speakerInfo.PresenterProfileImage && (
											<Image
												src={speakerInfo.PresenterProfileImage?.Url}
												alt={speakerInfo.Title}
												width={200}
												height={200}
											/>
										)}
									</div>
									<div className="col-span-5">
										<p className="mb-3 font-bold">{speakerInfo.Title}</p>
										<p
											className="prose-sm"
											dangerouslySetInnerHTML={{
												__html: speakerInfo.PresenterShortDescription,
											}}
										/>
										{!!speakerInfo.PresenterProfileLink && (
											<a
												className="float-right border-b-1 border-dotted border-gray-450 !no-underline"
												href={speakerInfo.PresenterProfileLink}
												target="_blank"
												rel="noopener noreferrer"
											>
												{speakerInfo.Title}'s profile&gt;
											</a>
										)}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};
