"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { Ref } from "react";

import { channelIcons } from "@/components/menu/channel-icons";
import type { MenuChannel } from "@/types/menu";
import type { ExpandedChannelContent } from "@/types/portfolio";

interface ExpandedChannelProps {
  channel: MenuChannel;
  content: ExpandedChannelContent;
  regionRef: Ref<HTMLElement>;
  onClose: () => void;
}

export function ExpandedChannel({
  channel,
  content,
  regionRef,
  onClose,
}: ExpandedChannelProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = channelIcons[channel.icon];
  const motionDuration = shouldReduceMotion ? 0.01 : 0.38;

  return (
    <motion.section
      ref={regionRef}
      className="expanded-channel"
      data-featured={channel.featured || undefined}
      id="expanded-channel"
      aria-labelledby={`expanded-channel-${channel.slug}-title`}
      tabIndex={-1}
      layoutId={
        shouldReduceMotion
          ? undefined
          : `portfolio-channel-${channel.slug}`
      }
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0.7, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0.7, y: -10 }}
      transition={{
        duration: motionDuration,
        ease: [0.2, 0.8, 0.2, 1],
        layout: {
          duration: motionDuration,
          ease: [0.2, 0.8, 0.2, 1],
        },
      }}
    >
      <header className="expanded-channel__header">
        <div className="expanded-channel__identity">
          <span className="expanded-channel__icon" aria-hidden="true">
            {channel.avatar ? (
              <Image
                src={channel.avatar.src}
                alt=""
                width={80}
                height={80}
                unoptimized
              />
            ) : (
              <Icon strokeWidth={1.8} />
            )}
          </span>

          <div className="expanded-channel__heading-copy">
            <p className="expanded-channel__eyebrow">{content.eyebrow}</p>
            <h2 id={`expanded-channel-${channel.slug}-title`}>
              {channel.title}
            </h2>
            <p>{channel.subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          className="expanded-channel__close"
          aria-label={`Close ${channel.title} channel and return to menu`}
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </button>
      </header>

      <motion.div
        className="expanded-channel__scroll"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.12,
          duration: shouldReduceMotion ? 0.01 : 0.24,
        }}
      >
        <div className="expanded-channel__content">
          <p className="expanded-channel__introduction">
            {content.introduction}
          </p>

          <div className="expanded-channel__sections">
            {content.sections.map((section) => (
              <section
                className="expanded-channel__section"
                key={section.title}
              >
                <header>
                  <h3>{section.title}</h3>
                  {section.introduction ? (
                    <p>{section.introduction}</p>
                  ) : null}
                </header>

                <div className="expanded-channel__items">
                  {section.items.map((item) => (
                    <article
                      className="expanded-channel__item"
                      data-has-image={item.image ? "true" : undefined}
                      data-placeholder={item.placeholder || undefined}
                      key={item.title}
                    >
                      <div className="expanded-channel__item-heading">
                        <div>
                          {item.meta ? <p>{item.meta}</p> : null}
                          <h4>{item.title}</h4>
                        </div>
                        {item.placeholder ? (
                          <span>Content needed</span>
                        ) : null}
                      </div>

                      <p>{item.description}</p>

                      {item.points?.length ? (
                        <ul>
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      ) : null}

                      {item.tags?.length ? (
                        <ul className="expanded-channel__tags" aria-label="Topics">
                          {item.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      ) : null}

                      {item.image ? (
                        <span
                          className="expanded-channel__item-media"
                          aria-hidden={item.image.alt === ""}
                        >
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            width={item.image.width}
                            height={item.image.height}
                            sizes="(min-width: 48rem) 14rem, 9.375rem"
                          />
                        </span>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {content.actions.length ? (
            <nav
              className="expanded-channel__actions"
              aria-label={`${channel.title} links`}
            >
              {content.actions.map((action) =>
                action.href ? (
                  <a
                    className="expanded-channel__action"
                    href={action.href}
                    key={action.label}
                    rel={action.external ? "noreferrer" : undefined}
                    target={action.external ? "_blank" : undefined}
                  >
                    <span>
                      <strong>{action.label}</strong>
                      <small>{action.description}</small>
                    </span>
                    {action.external ? <ExternalLink aria-hidden="true" /> : null}
                  </a>
                ) : (
                  <span
                    className="expanded-channel__action"
                    aria-disabled="true"
                    key={action.label}
                  >
                    <span>
                      <strong>{action.label}</strong>
                      <small>{action.description}</small>
                    </span>
                  </span>
                ),
              )}
            </nav>
          ) : null}
        </div>
      </motion.div>
    </motion.section>
  );
}
