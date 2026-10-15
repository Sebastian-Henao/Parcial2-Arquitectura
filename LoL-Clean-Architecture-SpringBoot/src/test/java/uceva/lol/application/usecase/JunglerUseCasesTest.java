package uceva.lol.application.usecase;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import uceva.lol.domain.entity.Jungler;
import uceva.lol.domain.exception.InvalidDifficultyException;
import uceva.lol.domain.exception.JunglerNotFoundException;
import uceva.lol.domain.repository.JunglerRepository;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JunglerUseCasesTest {

    @Mock
    private JunglerRepository repository;

    @InjectMocks
    private GetAllJunglersUseCase getAllJunglersUseCase;

    @InjectMocks
    private GetJunglerByIdUseCase getJunglerByIdUseCase;

    @InjectMocks
    private GetJunglersByDifficultyUseCase getJunglersByDifficultyUseCase;

    @Test
    void listsAllWhenRoleIsNull() {
        List<Jungler> junglers = List.of(jungler(1, "Asesino", 3), jungler(2, "Tanque", 1));
        when(repository.getAll()).thenReturn(junglers);

        assertEquals(junglers, getAllJunglersUseCase.execute(null));
        verify(repository).getAll();
    }

    @Test
    void filtersRoleIgnoringCaseAndWhitespace() {
        Jungler assassin = jungler(1, "Asesino", 3);
        when(repository.getAll()).thenReturn(List.of(assassin, jungler(2, "Tanque", 1)));

        assertEquals(List.of(assassin), getAllJunglersUseCase.execute(" asesino "));
    }

    @Test
    void returnsJunglerWhenIdExists() {
        Jungler expected = jungler(1, "Luchador", 2);
        when(repository.getById(1)).thenReturn(Optional.of(expected));

        assertEquals(expected, getJunglerByIdUseCase.execute(1));
    }

    @Test
    void throwsWhenIdDoesNotExist() {
        when(repository.getById(99)).thenReturn(Optional.empty());

        assertThrows(JunglerNotFoundException.class, () -> getJunglerByIdUseCase.execute(99));
    }

    @Test
    void filtersByDifficulty() {
        Jungler expected = jungler(2, "Mago", 2);
        when(repository.getAll()).thenReturn(List.of(jungler(1, "Luchador", 1), expected));

        assertEquals(List.of(expected), getJunglersByDifficultyUseCase.execute(2));
    }

    @Test
    void rejectsDifficultyOutsideRange() {
        assertThrows(InvalidDifficultyException.class, () -> getJunglersByDifficultyUseCase.execute(4));
    }

    private Jungler jungler(int id, String role, int difficulty) {
        return new Jungler(id, "Campeon " + id, "Titulo", role, difficulty,
                "Runaterra", "Fisico", "Descripcion", List.of("Q", "W", "E", "R"));
    }
}
