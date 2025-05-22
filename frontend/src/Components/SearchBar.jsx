import React, { useState } from "react"; // Importação do React e do hook useState para gerenciar o estado local

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState(""); // Estado local para armazenar o texto da pesquisa

    // Função chamada sempre que o usuário digita no campo de pesquisa
    const handleSearch = (e) => {
        setQuery(e.target.value); // Atualiza o estado com o valor digitado
        onSearch(e.target.value); // Passa a pesquisa para o componente pai (Home)
    };

    return (
        <div className="search-bar">
            <input
                type="text" placeholder="Pesquisar eventos..." // Texto de placeholder dentro do input
                value={query} onChange={handleSearch} />

            <button className="search-button">🔍</button>
        </div>
    );
}

export default SearchBar;