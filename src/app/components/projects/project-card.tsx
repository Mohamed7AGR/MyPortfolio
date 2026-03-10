"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectCardProps } from "@/Types/types";
import {
  ChevronDown,
  ChevronUp,
  Code,
  ExternalLink,
  Globe,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";

const ProjectCard = ({ project }: ProjectCardProps) => {
  const firstImage = project.images?.[0];
  const [showAllTags, setShowAllTags] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const maxVisibleTags = 5;
  const hasMoreTags = project.tools.length > maxVisibleTags;
  const visibleTools = showAllTags
    ? project.tools
    : project.tools.slice(0, maxVisibleTags);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Helper function to check if project is less than a month old
  const isNewProject = (dateString: string) => {
    if (!dateString) return false;

    try {
      const projectDate = new Date(dateString);
      const currentDate = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);

      return projectDate >= oneMonthAgo && projectDate <= currentDate;
    } catch {
      return false;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.1), transparent 40%)`,
        }}
      />

      <Card className="relative flex flex-col h-full justify-between border border-white/10 bg-[#050505]/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:border-cyan-600/50 hover:shadow-cyan-600/10">
        <div className="flex-1">
          <div className="relative overflow-hidden aspect-video">
            {project.videos?.[0] ? (
              <video
                src={project.videos[0]}
                className="w-full h-full object-cover"
                muted
                loop
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
            ) : firstImage ? (
              <Image
                src={firstImage}
                width={800}
                height={450}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                <span className="text-slate-600">{project.name}</span>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />

            {isNewProject(project.date) && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600 to-cyan-900 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse z-10 border border-white/10">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] font-bold tracking-wider">
                  NEW
                </span>
              </div>
            )}
          </div>

          <CardHeader className="p-4 sm:p-6 pb-2">
            <Link
              href={`/projects/${project.id}`}
              className="group/title inline-block min-w-0"
            >
              <CardTitle className="text-xl sm:text-2xl font-bold text-white group-hover/title:text-cyan-500 transition-colors flex items-center gap-2 tracking-tight break-words">
                {project.name}
                <ExternalLink className="w-4 h-4 shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-y-0 group-hover/title:translate-x-0 transition-all text-cyan-500" />
              </CardTitle>
            </Link>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsDescriptionOpen((prev) => !prev);
              }}
              className="w-full text-left group/desc"
            >
              <p
                className={`text-slate-400 text-sm mb-2 leading-relaxed font-medium italic transition-all ${
                  isDescriptionOpen ? "line-clamp-none" : "line-clamp-2"
                }`}
              >
                {project.description}
              </p>
              <span className="inline-flex items-center gap-1 text-cyan-500/90 hover:text-cyan-400 text-xs font-bold uppercase tracking-widest">
                {isDescriptionOpen ? (
                  <>
                    Show less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Read full description <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </span>
            </button>
            <div className="mb-6" />
            <div className="flex flex-wrap gap-2 mt-4">
              {visibleTools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-[11px] font-bold bg-white/5 border border-white/10 text-slate-400 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-500 transition-all duration-300"
                >
                  {tool}
                </span>
              ))}
              {hasMoreTags && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllTags(!showAllTags);
                  }}
                  className="flex items-center gap-1 text-cyan-500 hover:text-cyan-400 text-[11px] font-black transition-colors pl-1 uppercase tracking-widest"
                >
                  {showAllTags ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    `+${project.tools.length - maxVisibleTags}`
                  )}
                </button>
              )}
            </div>
          </CardContent>
        </div>

        <CardFooter className="p-4 sm:p-6 pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href={project.demo || "#"} target="_blank" className="flex-1">
            <Button
              className={`w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 ${
                project.demo
                  ? "bg-white/5 hover:bg-cyan-600 text-white hover:border-cyan-500 shadow-xl hover:shadow-cyan-600/20"
                  : "bg-white/2 text-slate-800 cursor-not-allowed border-none"
              }`}
              disabled={!project.demo}
            >
              <Globe className="w-4 h-4" />
              Live Demo
            </Button>
          </Link>
          <Link href={project.code || "#"} target="_blank" className="flex-1">
            <Button
              className={`w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 ${
                project.code
                  ? "bg-white/5 hover:bg-cyan-950 text-white hover:border-cyan-800 shadow-xl hover:shadow-cyan-950/20"
                  : "bg-white/2 text-slate-800 cursor-not-allowed border-none"
              }`}
              disabled={!project.code}
            >
              <Code className="w-4 h-4" />
              Source
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
