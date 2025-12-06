"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <main className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Receitinhas do vinilu
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            as melhores receitas selecionadas a mão pelo vinilu
          </p>

          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Buscar receita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {filteredRecipes.length} receita
            {filteredRecipes.length !== 1 ? "s" : ""} encontrada
            {filteredRecipes.length !== 1 ? "s" : ""}
          </p>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-zinc-800">
                  <TableHead className="text-black dark:text-white">
                    Name
                  </TableHead>
                  <TableHead className="text-black dark:text-white">
                    Cuisine
                  </TableHead>
                  <TableHead className="text-black dark:text-white">
                    Difficulty
                  </TableHead>
                  <TableHead className="text-black dark:text-white">
                    Prep Time
                  </TableHead>
                  <TableHead className="text-black dark:text-white">
                    Cook Time
                  </TableHead>
                  <TableHead className="text-black dark:text-white">
                    Servings
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map((recipe) => (
                    <TableRow
                      key={recipe.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                    >
                      <TableCell className="font-semibold text-black dark:text-white">
                        {recipe.name}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {recipe.cuisine}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            recipe.difficulty === "Easy"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : recipe.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {recipe.difficulty}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {recipe.prepTime}m
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {recipe.cookTime}m
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {recipe.servings}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-gray-500 dark:text-gray-400"
                    >
                      Nenhuma receita encontrada com "{searchTerm}"
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
