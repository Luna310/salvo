package com.codeoftheweb.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;

    private String user;

    @OneToMany(mappedBy="player", fetch=FetchType.EAGER)
    Set<GamePlayer> gamePlayers = new HashSet<>();

    @OneToMany(mappedBy="player", fetch=FetchType.EAGER)
    Set<Score> scores = new HashSet<>();

    public Player() {
    }

    public Player(String email) {

        this.user=email;
    }

    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }

    public void setGamePlayers(Set<GamePlayer> gamePlayers) {
        this.gamePlayers = this.gamePlayers;
    }

    public Set<Score> getScores() {
        return this.scores;
    }

    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }

    public String getUser() {
        return this.user;
    }

    public void setUser(String email) {
        this.user = email;
    }

    public String toString() {
        return user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void addGamePlayer(GamePlayer gamePlayer) {
        gamePlayer.setPlayer(this);
        gamePlayers.add(gamePlayer);
    }

    public void addScore(Score score) {
        score.setPlayer(this);
        scores.add(score);
    }

    public List<Game> getGames(){
        return this.gamePlayers.stream().map(gp -> gp.getGame()).collect(Collectors.toList());
    }

}
