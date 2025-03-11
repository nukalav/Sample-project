import React, { useState } from 'react';
import './styles.css';

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching:', searchQuery);
    };

    return (
        <div className="main-container">
            <div className="dark-overlay"></div>
            
            <div className="search-section">
                <h1 className="title">
                    <span>🔍</span>
                    <span>AI Search</span>
                </h1>

                <form onSubmit={handleSearch}>
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Ask me anything..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;