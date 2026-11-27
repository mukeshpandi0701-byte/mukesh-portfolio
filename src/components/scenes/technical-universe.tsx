"use client";

import { useState } from "react";
import { practices } from "@/data/skills";

export function TechnicalUniverse() {
  const [active, setActive] = useState(0);
  return <section className="universe" id="universe"><div className="section-head"><div><span className="section-kicker">04 / TECHNICAL UNIVERSE</span><h2>Tools are<br/><em>instruments.</em></h2></div><p>Chosen to fit the idea.<br/>Never the other way around.</p></div><div className="universe-map"><div className="universe-center" aria-live="polite"><span>THE<br/>{practices[active].name.toUpperCase()}</span><small>{practices[active].note}</small></div><div className="universe-line line-a"/><div className="universe-line line-b"/><div className="universe-line line-c"/>{practices.map((practice, index) => <button key={practice.label} className={`orbit-label orbit-${["one", "two", "three"][index]}${active === index ? " is-active" : ""}`} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><b>{practice.label}</b><span>{practice.tools}</span></button>)}<div className="orbit-node node-a"/><div className="orbit-node node-b"/><div className="orbit-node node-c"/></div></section>;
}
