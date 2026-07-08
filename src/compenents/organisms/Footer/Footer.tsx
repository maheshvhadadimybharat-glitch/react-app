import React from "react";
import Branding from "../../molecules/Branding/Branding";
import LinkList from "../../molecules/LinkList/LinkList";
import SocialLinks from "../../molecules/SocialLinks/SocialLinks";
import { Text } from "../../atoms/Text";
import { Image } from "../../atoms/Image";
import Section from "../../primitives/Section/Section";

const Footer = ({
  importantLinks,
  usefulLinks,
}) => {

  return (
    <footer className="bg-gray-100 py-10">
      <Section 
        contained 
        spaceY="md"
        >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/*Logo & Emblem */}
          <div className="order-1 md:order-3 lg:order-1">
            <Branding
              hasEmblem={true}
            />
            <Text
                variant="helper"
                as="p"
                className="pt-4 pb-4"
                >
                  MY Bharat is an initiative of Ministry of Youth Affairs & Sports to empower Indian youth through social mobility, educational equity, and practical skills.
                </Text>
            <Text
                variant="helper"
                as="h6"
                className="inline-block bg-gray-300 rounded-full py-2 px-4 mt-3"
                >Last updated: 25-02-2026</Text>
          </div>

          {/*Important Links */}
          <div className="order-2">
            <LinkList 
              title="Important Links" 
              links={importantLinks}
              variant="dark"
              />
          </div>

          {/* Useful Links */}
          <div className="order-3 md:order-1 lg:order-3">
          <LinkList 
            title="Useful Links" 
            links={usefulLinks}
            variant="dark"
            />
          </div>

          {/* Social */}
          <div className="order-4">
            <SocialLinks 
              SocialLinksHeading="Follow Us"
            />
            <Text as="div" className="flex items-center gap-3 pb-4">
              Powered by:
              <span className="flex items-center w-[110px]">
                <Image alt="Digital India" src="https://cdn-prod.mybharats.in/mybharat/assets/img/yuva_landing/DigitalIndiamybharat.svg"/>
              </span>
            </Text>
            
            <Text variant="helper" as="p">
              Digital India Corporation (DIC) Ministry of Electronics & IT (MeitY) Government of India
            </Text>
          </div>

        </div>
      </Section>
    </footer>
  )
}

export default Footer;