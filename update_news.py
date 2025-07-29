import requests
import json
import os
from datetime import datetime, timedelta

def fetch_financial_news():
    API_KEY = '4301c74f4e0949f2ac3829ce088a1f43'
    thirty_days_ago = (datetime.utcnow() - timedelta(days=30)).strftime('%Y-%m-%d')
    url = f'https://newsapi.org/v2/everything?q=finance%20OR%20market%20OR%20investment%20OR%20stocks%20OR%20bonds%20OR%20etf%20OR%20derivatives%20OR%20trading%20OR%20portfolio%20OR%20hedge%20fund%20OR%20mutual%20fund%20OR%20asset%20allocation%20OR%20risk%20management%20OR%20yield%20curve%20OR%20interest%20rate%20OR%20central%20bank%20OR%20monetary%20policy%20OR%20equity%20OR%20fixed%20income%20OR%20commodities%20OR%20forex%20OR%20cryptocurrency&language=en&from={thirty_days_ago}&sortBy=publishedAt&apiKey={API_KEY}'
    
    # Highly specific keywords for financial markets and investments
    keywords = [
        # Major indices and financial instruments
        "s&p 500", "sp500", "spx", "nasdaq", "dow jones", "djia", "russell 2000", "ftse 100", "nikkei 225", "dax", "cac 40", "tsx", "hang seng", "shanghai composite",
        "treasury yield", "bond yield", "yield curve", "inverted yield curve", "credit spread", "high yield bond", "investment grade bond", "junk bond", "corporate bond", "sovereign bond",
        "etf", "exchange traded fund", "mutual fund", "hedge fund", "private equity", "venture capital", "ipo", "spac", "dividend", "share buyback", "stock split",
        "options trading", "futures contract", "derivatives", "structured product", "volatility index", "vix", "earnings report", "quarterly results", "analyst upgrade", "analyst downgrade",
        "monetary policy", "rate hike", "rate cut", "interest rate decision", "federal reserve", "ecb", "bank of england", "boj", "pboc", "central bank meeting",
        "quantitative easing", "tapering", "balance sheet", "repo market", "liquidity crunch", "systemic risk", "stress test", "capital requirement", "leverage ratio",
        "inflation data", "cpi", "ppi", "gdp growth", "unemployment rate", "recession risk", "market correction", "bull market", "bear market", "market volatility",
        "asset allocation", "portfolio rebalancing", "risk management", "factor investing", "smart beta", "esg investing", "sustainable finance", "green bond",
        "cryptocurrency", "bitcoin", "ethereum", "blockchain", "defi", "stablecoin", "cbdc",
        # Tickers for major ETFs and financial products
        "spy", "qqq", "dia", "iwm", "efa", "eem", "vnq", "lqd", "hyg", "tlt", "shy", "ief", "agg", "bnd", "mub", "tip", "gld", "slv", "uso", "dba", "uup", "fxe", "fxy", "fxb"
    ]
    
    MIN_ARTICLES = 7  # Maximum number of articles to display
    try:
        response = requests.get(url)
        data = response.json()
        print('API response totalResults:', data.get('totalResults'))  # Debug output
        print('API response articles count:', len(data.get('articles', [])))  # Debug output
        
        filtered = []
        for item in data.get('articles', []):
            title = item.get('title') or ''
            description = item.get('description') or ''
            text = (title + ' ' + description).lower()
            if any(kw in text for kw in keywords):
                filtered.append(item)
            if len(filtered) >= MIN_ARTICLES:
                break
        
        # If not enough, fill with most recent relevant news
        if len(filtered) < MIN_ARTICLES:
            for item in data.get('articles', []):
                if item not in filtered:
                    filtered.append(item)
                if len(filtered) >= MIN_ARTICLES:
                    break
        
        news_items = []
        for item in filtered[:MIN_ARTICLES]:
            news_items.append({
                'title': item['title'],
                'url': item['url'],
                'source': item['source']['name'],
                'date': item['publishedAt']
            })
        
        # Save to a JSON file
        with open('trending_news.json', 'w') as f:
            json.dump(news_items, f)
        print('Successfully wrote trending_news.json')  # Debug output
        return True
    except Exception as e:
        print(f"Error updating news: {e}")
        return False

if __name__ == "__main__":
    fetch_financial_news() 