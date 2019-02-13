package com.codeoftheweb.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.*;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String [] args) {
		SpringApplication.run(SalvoApplication.class, args);

	}

	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository,
									  GameRepository gameRepository, GamePlayerRepository gamePlayerRepository,
									  ShipRepository shipRepository, SalvoRepository salvoRepository, ScoreRepository scoreRepository) {
		return (args) -> {
			Player player1 = new Player("j.bauer@ctu.gov");
			Player player2 = new Player("c.obrian@ctu.gov");
			Player player3 = new Player("kim_bauer@gmail.com");
			Player player4 = new Player("t.almeida@ctu.gov");
			System.out.print(player1.getUser());


			// save a couple of customers
			playerRepository.save(player1);
			playerRepository.save(player2);
			playerRepository.save(player3);
			playerRepository.save(player4);

			Game game1 = new Game();
			Game game2 = new Game();
			Game game3 = new Game();
			Game game4 = new Game();
			Game game5 = new Game();
			Game game6 = new Game();
			Game game7 = new Game();
			Game game8 = new Game();

			gameRepository.save(game1);
			gameRepository.save(game2);
			gameRepository.save(game3);
			gameRepository.save(game4);
			gameRepository.save(game5);
			gameRepository.save(game6);
			gameRepository.save(game7);
			gameRepository.save(game8);



			GamePlayer gamePlayer1=new GamePlayer(player1,game1);
			GamePlayer gamePlayer2=new GamePlayer(player2,game1);
			GamePlayer gamePlayer3=new GamePlayer(player1,game2);
			GamePlayer gamePlayer4=new GamePlayer(player2,game2);
			GamePlayer gamePlayer5=new GamePlayer(player2,game3);
			GamePlayer gamePlayer6=new GamePlayer(player4,game3);
			GamePlayer gamePlayer7=new GamePlayer(player2,game4);
			GamePlayer gamePlayer8=new GamePlayer(player1,game4);
			GamePlayer gamePlayer9=new GamePlayer(player4,game5);
			GamePlayer gamePlayer10=new GamePlayer(player1,game5);
			GamePlayer gamePlayer11=new GamePlayer(player3,game6);
			GamePlayer gamePlayer12=new GamePlayer(player4,game7);
			GamePlayer gamePlayer13=new GamePlayer(player3,game8);
			GamePlayer gamePlayer14=new GamePlayer(player4,game8);


			gamePlayerRepository.save(gamePlayer1);
			gamePlayerRepository.save(gamePlayer2);
			gamePlayerRepository.save(gamePlayer3);
			gamePlayerRepository.save(gamePlayer4);
			gamePlayerRepository.save(gamePlayer5);
			gamePlayerRepository.save(gamePlayer6);
			gamePlayerRepository.save(gamePlayer7);
			gamePlayerRepository.save(gamePlayer8);
			gamePlayerRepository.save(gamePlayer9);
			gamePlayerRepository.save(gamePlayer10);
			gamePlayerRepository.save(gamePlayer11);
			gamePlayerRepository.save(gamePlayer12);
			gamePlayerRepository.save(gamePlayer13);
			gamePlayerRepository.save(gamePlayer14);

			List<String> location1 = Arrays.asList("H2","H3","H4");
			Ship ship1=new Ship("Destroyer",location1);


			List<String> location2 = Arrays.asList("E1", "F1", "G1");
			Ship ship2=new Ship("Submarine",location2);


			List<String> location3 = Arrays.asList("B4","B5");
			Ship ship3=new Ship("Patrol Boat",location3);

			List<String> location4 = Arrays.asList("B5","C5","D5");
			Ship ship4=new Ship("Destroyer",location4);


			List<String> location5 = Arrays.asList("B4","B5");
			Ship ship5=new Ship("Patrol Boat",location5);


			gamePlayer1.addShip(ship1);
			gamePlayer1.addShip(ship2);
			gamePlayer1.addShip(ship3);
			gamePlayer2.addShip(ship4);
			gamePlayer2.addShip(ship5);

			List<String> location6 = Arrays.asList("B5","C5","D5");
			Ship ship6=new Ship("Destroyer",location6);


			List<String> location7 = Arrays.asList("C6","C7");
			Ship ship7=new Ship("Patrol Boat",location7);


			List<String> location8 = Arrays.asList("A2","A3","A4");
			Ship ship8=new Ship("Submarine",location8);


			List<String> location9 = Arrays.asList("G6","H6");
			Ship ship9=new Ship("Patrol Boat",location9);


			gamePlayer3.addShip(ship6);
			gamePlayer3.addShip(ship7);
			gamePlayer4.addShip(ship8);
			gamePlayer4.addShip(ship9);

			List<String> location10 = Arrays.asList("B5","C5","D5");
			Ship ship10=new Ship("Destroyer",location10);


			List<String> location11 = Arrays.asList("C6","C7");
			Ship ship11=new Ship("Patrol Boat",location11);


			List<String> location12 = Arrays.asList("A2","A3","A4");
			Ship ship12=new Ship("Submarine",location12);


			List<String> location13 = Arrays.asList("G6","H6");
			Ship ship13=new Ship("Patrol Boat",location13);


			gamePlayer5.addShip(ship10);
			gamePlayer5.addShip(ship11);
			gamePlayer6.addShip(ship12);
			gamePlayer6.addShip(ship13);

			List<String> location14 = Arrays.asList("B5","C5","D5");
			Ship ship14=new Ship("Destroyer",location14);


			List<String> location15 = Arrays.asList("C6","C7");
			Ship ship15=new Ship("Patrol Boat",location15);


			List<String> location16 = Arrays.asList("A2","A3","A4");
			Ship ship16=new Ship("Submarine",location16);


			List<String> location17 = Arrays.asList("G6","H6");
			Ship ship17=new Ship("Patrol Boat",location17);


			gamePlayer7.addShip(ship14);
			gamePlayer7.addShip(ship15);
			gamePlayer8.addShip(ship16);
			gamePlayer8.addShip(ship17);

			List<String> location18 = Arrays.asList("B5","C5","D5");
			Ship ship18=new Ship("Destroyer",location18);


			List<String> location19 = Arrays.asList("C6","C7");
			Ship ship19=new Ship("Patrol Boat",location19);


			List<String> location20 = Arrays.asList("A2","A3","A4");
			Ship ship20=new Ship("Submarine",location20);


			List<String> location21 = Arrays.asList("G6","H6");
			Ship ship21=new Ship("Patrol Boat",location21);


			gamePlayer9.addShip(ship18);
			gamePlayer9.addShip(ship19);
			gamePlayer10.addShip(ship20);
			gamePlayer10.addShip(ship21);

			List<String> location22 = Arrays.asList("B5","C5","D5");
			Ship ship22=new Ship("Destroyer",location22);

			List<String> location23 = Arrays.asList("C6","C7");
			Ship ship23=new Ship("Patrol Boat",location23);

			gamePlayer11.addShip(ship22);
			gamePlayer11.addShip(ship23);

			List<String> location24 = Arrays.asList("B5","C5","D5");
			Ship ship24=new Ship("Destroyer",location24);

			List<String> location25 = Arrays.asList("C6","C7");
			Ship ship25=new Ship("Patrol Boat",location25);

			List<String> location26 = Arrays.asList("A2","A3","A4");
			Ship ship26=new Ship("Submarine",location26);

			List<String> location27 = Arrays.asList("G6","H6");
			Ship ship27=new Ship("Patrol Boat",location27);

			gamePlayer13.addShip(ship24);
			gamePlayer13.addShip(ship25);
			gamePlayer14.addShip(ship26);
			gamePlayer14.addShip(ship27);

			shipRepository.save(ship1);
			shipRepository.save(ship2);
			shipRepository.save(ship3);
			shipRepository.save(ship4);
			shipRepository.save(ship5);
			shipRepository.save(ship6);
			shipRepository.save(ship7);
			shipRepository.save(ship8);
			shipRepository.save(ship9);
			shipRepository.save(ship10);
			shipRepository.save(ship11);
			shipRepository.save(ship12);
			shipRepository.save(ship13);
			shipRepository.save(ship14);
			shipRepository.save(ship15);
			shipRepository.save(ship16);
			shipRepository.save(ship17);
			shipRepository.save(ship18);
			shipRepository.save(ship19);
			shipRepository.save(ship20);
			shipRepository.save(ship21);
			shipRepository.save(ship22);
			shipRepository.save(ship23);
			shipRepository.save(ship24);
			shipRepository.save(ship25);
			shipRepository.save(ship26);
			shipRepository.save(ship27);

			List<String> locationSalvo1 = Arrays.asList("B5", "C5", "F1");
			Salvo salvo1 = new Salvo(1,locationSalvo1);
			List<String> locationSalvo2 = Arrays.asList("B4", "B5", "B6");
			Salvo salvo2 = new Salvo(1,locationSalvo2);
			List<String> locationSalvo3 = Arrays.asList("F2", "D5");
			Salvo salvo3 = new Salvo(2,locationSalvo3);
			List<String> locationSalvo4 = Arrays.asList("E1", "H3", "A2");
			Salvo salvo4 =new Salvo(2,locationSalvo4);
			gamePlayer1.addSalvo(salvo1);
			gamePlayer1.addSalvo(salvo3);
			gamePlayer2.addSalvo(salvo2);
			gamePlayer2.addSalvo(salvo4);

			List<String> locationSalvo5 = Arrays.asList("A2", "A4", "G6");
			Salvo salvo5 = new Salvo(1,locationSalvo5);
			List<String> locationSalvo6 = Arrays.asList("B5", "D5", "C7");
			Salvo salvo6 = new Salvo(1,locationSalvo6);
			List<String> locationSalvo7 = Arrays.asList("A3", "H6");
			Salvo salvo7 = new Salvo(2,locationSalvo7);
			List<String> locationSalvo8 = Arrays.asList("C5", "C6");
			Salvo salvo8 =new Salvo(2,locationSalvo8);
			gamePlayer3.addSalvo(salvo5);
			gamePlayer3.addSalvo(salvo7);
			gamePlayer4.addSalvo(salvo6);
			gamePlayer4.addSalvo(salvo8);

			List<String> locationSalvo9 = Arrays.asList("G6", "H6", "A4");
			Salvo salvo9 = new Salvo(1,locationSalvo9);
			List<String> locationSalvo10 = Arrays.asList("H1", "H2", "H3");
			Salvo salvo10 = new Salvo(1,locationSalvo10);
			List<String> locationSalvo11 = Arrays.asList("A2", "A3", "D8");
			Salvo salvo11 = new Salvo(2,locationSalvo11);
			List<String> locationSalvo12 = Arrays.asList("E1", "F2", "G3");
			Salvo salvo12 =new Salvo(2,locationSalvo12);
			gamePlayer5.addSalvo(salvo9);
			gamePlayer5.addSalvo(salvo11);
			gamePlayer6.addSalvo(salvo10);
			gamePlayer6.addSalvo(salvo12);

			List<String> locationSalvo13 = Arrays.asList("A3", "A4", "F7");
			Salvo salvo13 = new Salvo(1,locationSalvo13);
			List<String> locationSalvo14 = Arrays.asList("B5", "C6", "H1");
			Salvo salvo14 = new Salvo(1,locationSalvo14);
			List<String> locationSalvo15 = Arrays.asList("A2", "G6", "H6");
			Salvo salvo15 = new Salvo(2,locationSalvo15);
			List<String> locationSalvo16 = Arrays.asList("C5", "C7", "D5");
			Salvo salvo16 =new Salvo(2,locationSalvo16);
			gamePlayer7.addSalvo(salvo13);
			gamePlayer7.addSalvo(salvo15);
			gamePlayer8.addSalvo(salvo14);
			gamePlayer8.addSalvo(salvo16);

			List<String> locationSalvo17 = Arrays.asList("A1", "A2", "A3");
			Salvo salvo17 = new Salvo(1,locationSalvo17);
			List<String> locationSalvo18 = Arrays.asList("B5", "B6", "C7");
			Salvo salvo18 = new Salvo(1,locationSalvo18);
			List<String> locationSalvo19 = Arrays.asList("G6", "G7", "G8");
			Salvo salvo19 = new Salvo(2,locationSalvo19);
			List<String> locationSalvo20 = Arrays.asList("C6", "D6", "E6");
			Salvo salvo20 =new Salvo(2,locationSalvo20);
			List<String> locationSalvo21 = Arrays.asList("H1", "H8");
			Salvo salvo21 =new Salvo(3,locationSalvo21);

			gamePlayer9.addSalvo(salvo17);
			gamePlayer9.addSalvo(salvo19);
			gamePlayer10.addSalvo(salvo18);
			gamePlayer10.addSalvo(salvo20);
			gamePlayer10.addSalvo(salvo21);



			salvoRepository.save(salvo1);
			salvoRepository.save(salvo2);
			salvoRepository.save(salvo3);
			salvoRepository.save(salvo4);
			salvoRepository.save(salvo5);
			salvoRepository.save(salvo6);
			salvoRepository.save(salvo7);
			salvoRepository.save(salvo8);
			salvoRepository.save(salvo9);
			salvoRepository.save(salvo10);
			salvoRepository.save(salvo11);
			salvoRepository.save(salvo12);
			salvoRepository.save(salvo13);
			salvoRepository.save(salvo14);
			salvoRepository.save(salvo15);
			salvoRepository.save(salvo16);
			salvoRepository.save(salvo17);
			salvoRepository.save(salvo18);
			salvoRepository.save(salvo19);
			salvoRepository.save(salvo20);
			salvoRepository.save(salvo21);

			Score score1 = new Score(1.0,player1,game1);
			Score score2 = new Score(0.0,player2,game1);
			Score score3 = new Score(0.5,player1,game2);
			Score score4 = new Score(0.5,player2,game2);
			Score score5 = new Score(1.0,player2,game3);
			Score score6 = new Score(0.0,player4,game3);
			Score score7 = new Score(0.5,player2,game4);
			Score score8 = new Score(0.5,player1,game4);

			scoreRepository.save(score1);
			scoreRepository.save(score2);
			scoreRepository.save(score3);
			scoreRepository.save(score4);
			scoreRepository.save(score5);
			scoreRepository.save(score6);
			scoreRepository.save(score7);
			scoreRepository.save(score8);

		};

	}
}

//	Player player1 = new Player("j.bauer@ctu.gov");
//	Player player2 = new Player("c.obrian@ctu.gov");
//	Player player3 = new Player("kim_bauer@gmail.com");
//	Player player4 = new Player("t.almeida@ctu.gov");

