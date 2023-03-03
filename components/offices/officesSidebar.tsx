import Image from "next/image";

const OfficesSidebar = ({ phone, streetAddress, suburb, addressLocality, addressRegion, postalCode, addressCountry }) => {
    return (
        <div>
            <h3>Contact Us</h3>
            <p>Whether you're having trouble with your development process or you just need us to write 
                some awesome software, our team of experts is ready to help.
            </p>

            <p>Give us a call on<br/><strong>{phone}</strong></p>

            <p>Find us at<br/>
            <strong>
                {streetAddress} <br/>
                {suburb}, {addressLocality}, {addressRegion} {postalCode} <br/>
                {addressCountry}
            </strong></p>

            <p>Learn more on <a href="https://sswchapel.com.au/sydney/">SSW Chapel</a></p>

            <h3>We ❤️ Microsoft</h3>
            <div className="border-1 border-gray-300 bg-gray-100 px-3 py-4">
                <p><strong>SSW is a Microsoft Gold Certified Partner!</strong></p>
                <Image 
                    className="m-0"
                    src="/images/logos/Microsoft-Gold-Partner.png"
                    width={177}
                    height={50}
                    alt="Microsoft Gold Partner"
                />
                <p>Microsoft Gold Certified Partners are the elite Microsoft Business Partners who earn 
                    the highest customer endorsement. They have the knowledge, skills, and commitment to 
                    help implement technology solutions that match your exact business needs. Microsoft 
                    Gold Certified Partners have passed the highest level of requirements from Microsoft 
                    and have demonstrated the most robust, efficient and scalable implementations of Microsoft 
                    technologies in demonstrated enterprise customer deployments or an on-site Microsoft assessment.
                </p>
            </div>
            <h3>Testimonials</h3>
            <div className="border-1 border-gray-300 bg-gray-100 px-3 py-4">
                <p>"I was very happy with SSW's service on our recent .NET Point-of-Sale project. 
                    Some of the types of issues SSW handled adeptly were: the quality of the user interface, 
                    business requirements, legacy code and data structures, and ease of maintenance for down the track."
                </p>
            </div>
        </div>
    )
}

export default OfficesSidebar;