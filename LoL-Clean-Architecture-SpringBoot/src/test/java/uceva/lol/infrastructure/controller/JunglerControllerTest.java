package uceva.lol.infrastructure.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import uceva.lol.application.usecase.GetAllJunglersUseCase;
import uceva.lol.application.usecase.GetJunglerByIdUseCase;
import uceva.lol.application.usecase.GetJunglersByDifficultyUseCase;
import uceva.lol.domain.entity.Jungler;
import uceva.lol.domain.exception.InvalidDifficultyException;
import uceva.lol.domain.exception.JunglerNotFoundException;
import uceva.lol.infrastructure.exception.GlobalExceptionHandler;

import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class JunglerControllerTest {

    private GetAllJunglersUseCase getAll;
    private GetJunglerByIdUseCase getById;
    private GetJunglersByDifficultyUseCase getByDifficulty;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        getAll = mock(GetAllJunglersUseCase.class);
        getById = mock(GetJunglerByIdUseCase.class);
        getByDifficulty = mock(GetJunglersByDifficultyUseCase.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new JunglerController(getAll, getById, getByDifficulty))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void returnsJunglerList() throws Exception {
        when(getAll.execute(null)).thenReturn(List.of(jungler()));

        mockMvc.perform(get("/api/junglers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Lee Sin"));
    }

    @Test
    void returnsJunglerDetails() throws Exception {
        when(getById.execute(1)).thenReturn(jungler());

        mockMvc.perform(get("/api/junglers/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void mapsMissingJunglerToNotFound() throws Exception {
        when(getById.execute(99)).thenThrow(new JunglerNotFoundException(99));

        mockMvc.perform(get("/api/junglers/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
    }

    @Test
    void mapsInvalidDifficultyToBadRequest() throws Exception {
        when(getByDifficulty.execute(5)).thenThrow(new InvalidDifficultyException(5));

        mockMvc.perform(get("/api/junglers/difficulty/5"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));
    }

    private Jungler jungler() {
        return new Jungler(1, "Lee Sin", "el Monje Ciego", "Luchador", 2,
                "Ionia", "Fisico", "Campeon de jungla", List.of("Q", "W", "E", "R"));
    }
}
