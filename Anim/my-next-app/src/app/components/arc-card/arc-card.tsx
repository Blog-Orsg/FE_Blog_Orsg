"use client";
import { truncateText } from "@/app/utils/truncate-text";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  title: string;
  image?: string;
  onDelete: () => void;
  onEdit?: () => void;
  id?: number;
};

const ArcCard = ({ name, title, image, id, onDelete, onEdit }: Props) => {
  const boundingRef = useRef<DOMRect | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className=" mx-auto relative flex flex-col [perspective:800px] stroke-[18] opacity-80 filter cursor-pointer"
      style={{ filter: "url(#filter0_f_1706_102550)" }}
    >
      <div
        onMouseLeave={() => (boundingRef.current = null)}
        onMouseEnter={(ev) => {
          boundingRef.current = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={(ev) => {
          if (!boundingRef.current) return;
          const x = ev.clientX - boundingRef.current.left;
          const y = ev.clientY - boundingRef.current.top;
          const xPercentage = x / boundingRef.current.width;
          const yPercentage = y / boundingRef.current.height;
          const xRotation = (xPercentage - 0.5) * 20;
          const yRotation = (0.5 - yPercentage) * 20;

          ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
          ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
          ev.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
          ev.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
        }}
        className="
        border border-white/20
        overflow-hidden
        rounded-[5%] bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)] group relative grid w-[260px] grid-rows-[200px_120px_40px] p-4 text-[#fdfdfd] transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]"
      >
        <div className=" absolute top-2 right-2">
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Options"
          >
            ⋮
          </button>
          {isEditing && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 bg-white rounded shadow-lg p-2 text-black z-10"
            >
              <button
                onClick={() => {
                  setIsEditing(false);
                  onEdit && onEdit();
                }}
                className="block w-full text-left px-2 py-1 hover:bg-gray-200"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  onDelete();
                }}
                className="block w-full text-left px-2 py-1 hover:bg-gray-200"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
        <Image
          src={
            image?.startsWith("http") || image?.startsWith("/")
              ? image
              : "/images/hero.webp"
          }
          alt="Article Image"
          width={100}
          height={100}
          className="rounded-[10%] object-cover h-full w-full "
        />
        <div className="pt-4 h-full">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-sm text-ellipsis overflow-hidden">
            {truncateText(title, 80)}{" "}
            <Link href={`/blog/${id}`} className="btn-read-more text-blue-400">
              Read More
            </Link>
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]" />
      </div>
    </div>
  );
};

export default ArcCard;
