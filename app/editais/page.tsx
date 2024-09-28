"use client";

import { useEditaisStore } from "@/store/useEditaisStore";
import { useEffect } from "react";

export default function Editais() {
  const { editaisContent, fetchEditais } = useEditaisStore();

  useEffect(() => {
    fetchEditais();
  }, [fetchEditais]);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Editais Recentes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {editaisContent.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-violet-800 hover:underline">
              {item.title}
            </h3>
            <p className="mt-4 text-gray-700">
              {item.excerpt.split(" ").slice(0, 90).join(" ") + "..."}
            </p>
            <div className="mt-4">
              <a
                href="#"
                className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
              >
                Ler Edital
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span>Palavra-chave: <span className="font-semibold">{item.slug}</span></span>
              <p className="mt-1">
                {new Date(item.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
