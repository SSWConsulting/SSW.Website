import ReactPlayer from "react-player";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import classNames from "classnames";
import styles from "./overlapVideoCard.module.css";

const OverLapVideoCard: React.FC<{
  url: string
  image: string
  title: string
  description: TinaMarkdownContent,
}> = (props) => {
  const { url, image, title, description } = props;

  return (
    <div className="relative w-full overflow-hidden bg-cover bg-fixed bg-center" style={{ backgroundImage: `url(${image})` }}>
      <section className={classNames(
        styles["overlap-video-card"],
        "main-container",
        "text-center text-white relative",
      )}
      >

        <h1 className="mt-0" dangerouslySetInnerHTML={{ __html: title }}></h1>

        <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2">
          <div className={`${styles.player} relative mx-auto aspect-video`}>
            <ReactPlayer
              className="absolute top-0 left-0"
              url={url}
              width={"100%"}
              height={"100%"}
            />
          </div>

          <article className="mx-auto text-center">
            <TinaMarkdown
              content={description}
              components={{
                p: ({ children: { props: { content } } }) => {
                  return (
                    <>
                      {content.map(({ text }, idx) => (
                        <p key={idx} className="mx-auto w-3/4 font-sans text-md" data-aos="fade-up">
                          {text}
                        </p>
                      ))}
                    </>
                  )
                }
              }}
            />
          </article>
        </div>

      </section>
    </div>
  )

}

export default OverLapVideoCard;