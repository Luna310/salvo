package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RequestMapping("/api")
@RestController
public class SalvoController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GamePlayerRepository gamePlayerRepository;

    @Autowired
    private PlayerRepository playerRepository;


    public Map<String, Object> playerMapDTO(Player player) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", player.getId());
        dto.put("email", player.getUser());
        return dto;
    }

    public Map<String, Object> gamePlayerMapDTO(GamePlayer gamePlayer) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", gamePlayer.getId());
        dto.put("player", playerMapDTO(gamePlayer.getPlayer()));
        //dto.put("ship", gamePlayer.getShips().stream().map(sh -> shipDTO(sh)).collect(Collectors.toList()));
        return dto;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public Map<String, Object> gameMapDTO(Game game) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", game.getId());
        dto.put("create", game.getDate());
        dto.put("gamePlayers", game.getGamePlayers().stream().map(gp -> gamePlayerMapDTO(gp)).collect(Collectors.toList()));
        return dto;
    }

    public Map<String, Object> shipDTO(Ship ship) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("Type", ship.getType());
        dto.put("location", ship.getLocation());
        return dto;
    }

    public Map<String, Object> salvoDTO(Salvo salvo) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();

        dto.put("player", salvo.getGamePlayer().getPlayer().getId());
        dto.put("turn", salvo.getTurn());
        dto.put("location", salvo.getLocation());
        return dto;
    }

    public Map<String, Object> salvosDTO(Set<Salvo> salvos){
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("salvos", salvos.stream().map(sv -> salvoDTO(sv)).collect(Collectors.toList()));
        return dto;
    }

    public Map<String, Object> scoresDto(Set<Score> scores ) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        int won=0;
        int lost=0;
        int tied=0;
        double total=0;
        String player="";

        for(Score score : scores) {
            if (score.getScore() == 1) {
                won += 1;
            } else if (score.getScore() == 0.5) {
                tied += 1;
            } else if (score.getScore() == 0) {
                lost += 1;
            } else {
                System.out.print("Set a correct number!!!!");
            }
             player = score.getPlayer().getUser();
            total += score.getScore();
        }
        dto.put("player", player);
        dto.put("won", won);
        dto.put("lost", lost);
        dto.put("tied", tied);
        dto.put("total", total);
        System.out.print(total);
        return dto;
    }


    @RequestMapping("/games")
    public Map<String, Object> getAllGameDTO() {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();

        dto.put("games",gameRepository.findAll().stream().map(g -> gameMapDTO(g)).collect(Collectors.toList()) );
        dto.put("leaderBoard",playerRepository.findAll().stream().map(pl -> scoresDto(pl.getScores())).collect(Collectors.toList()));

        return dto;
    }

    @RequestMapping("game_view/{gamePlayerId}")
    public Map<String, Object> findGamePlayer(@PathVariable long gamePlayerId ) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        GamePlayer gamePlayer = gamePlayerRepository.findOne(gamePlayerId);
        Set<Ship> ships = gamePlayer.getShips();
        //Set<Salvo> salvos = gamePlayer.getSalvos();
        Game game = gamePlayer.getGame();
        Set<GamePlayer> gamePlayers = game.getGamePlayers();
        dto.put("game", gameMapDTO(gamePlayer.getGame()));
        dto.put("ships", ships.stream().map(sh -> shipDTO(sh)).collect(Collectors.toList()));
        dto.put("salvoPlayers", gamePlayers.stream().map(gp -> salvosDTO(gp.getSalvos())).collect(Collectors.toList()));

        return dto;

    }
}
