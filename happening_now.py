
from bs4 import BeautifulSoup
from splinter import Browser
import requests
import pymongo
import pandas as pd
import numpy as np
import time
import datetime

def init_browser():
    executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)



def scrape():
    browser = init_browser()

    browser.visit("http://fantasy.espn.com/tournament-challenge-bracket/2019/en/leaderboard")
    time.sleep(4)
    html = browser.html
    bracket_soup = BeautifulSoup(html, 'html.parser')
    leaderboard = bracket_soup.find('div', class_='tableModule leaderboard overall')

    entries = leaderboard.find('tbody').findAll('tr')

    rank=[]
    leaders=[]
    chosen_winners=[]
    total_points=[]
    r64=[]
    r32=[]
    s16=[]
    e8=[]
    f4=[]
    ncg=[]
    for entry in entries:
        rank.append(entry.find('td',class_='rank').text)
        leaders.append(entry.find('span',class_='owner').text)
        chosen_winners.append(entry.find('td',class_='champ').text)
        total_points.append(entry.find('td',class_='total').text)
        r64.append(entry.find('td',class_='period period_6 show').text)
        r32.append(entry.find('td',class_='period period_7 show').text)
        s16.append(entry.find('td',class_='period period_8 show').text)
        e8.append(entry.find('td',class_='period period_9 show').text)
        f4.append(entry.find('td',class_='period period_10 show').text)
        ncg.append(entry.find('td',class_='period period_11 show').text)

    d = {'Rank':rank,'Bracket Owner': leaders, "R64": r64, 'R32':r32, 'S16':s16, 'E8':e8, 'F4':f4, 'NCG':ncg,'Chosen Winner': chosen_winners,'Total Points':total_points}
    df = pd.DataFrame(data=d)
    df.set_index('Rank', inplace=True)
    espn_leader_html_table=df.to_html().replace('\n', '')
    now=datetime.datetime.now()
    espn_leader_table_header=f"ESPN Bracket Challenge Leaderboard: {now.month}/{now.day}/{now.year} {now.hour}:{now.minute}"

    # Scrape Vegas Odds


    browser.visit('http://www.vegasinsider.com/college-basketball/odds/futures/')
    html = browser.html
    odds_soup = BeautifulSoup(html, 'html.parser')
    betting_table_header = odds_soup.find('div', class_='viHeaderNorm').text
    betting_table=odds_soup.find('table', class_='table-wrapper cellTextNorm')
    tr=betting_table.findAll('tr')

    teams=[]
    odds=[]
    for t in tr[1:]:
        teams.append(t.find('td', class_="font-bold").text)
        odds.append(t.find('td', class_="last").text)
    d={'Teams':teams,'Odds':odds}
    odds_df=pd.DataFrame(data=d)
    odds_df.set_index('Teams', inplace=True)
    betting_table=odds_df.to_html().replace('\n', '')

    all_results_dictionary={}
    all_results_dictionary['espn_leader_table_header']=espn_leader_table_header
    all_results_dictionary['espn_leader_html_table']=espn_leader_html_table
    all_results_dictionary['betting_table_header']=betting_table_header
    all_results_dictionary['betting_table']=betting_table

    return all_results_dictionary


